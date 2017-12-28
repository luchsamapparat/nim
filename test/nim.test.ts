import { findLast, first, last, range } from 'lodash';
import { GameConfig, GameState, NimGame, Player, Strategy, getStrategies } from '../index';
import { getMockStrategy, playGame } from './test-util';

const gameConfig: GameConfig = {
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: Player.Human,
    strategy: getMockStrategy()
};

// tslint:disable-next-line:variable-name
getStrategies().forEach(strategyFactory => {
    const strategy = strategyFactory();

    describe(`NimGame with ${strategyFactory.name}`, () => {
        test('the initial heap size is configurable', () => {
            const nimGame = new NimGame({
                ...gameConfig,
                strategy
            });
            const gameState = nimGame.start();

            expect(gameState.heapSize).toBe(13);
        });

        test('the game has to be started before playing rounds', () => {
            const nimGameWithMachineStarting = new NimGame({
                ...gameConfig,
                startingPlayer: Player.Machine,
                strategy
            });
            const nimGameWithHumanStarting = new NimGame({
                ...gameConfig,
                startingPlayer: Player.Machine,
                strategy
            });

            expect(() => nimGameWithMachineStarting.playRound(1)).toThrowError();
            expect(() => nimGameWithHumanStarting.playRound(1)).toThrowError();
        });

        test('a player must remove at least one token', () => {
            const nimGame = new NimGame({
                ...gameConfig,
                strategy
            });
            nimGame.start();

            expect(() => nimGame.playRound(0)).toThrowError();
        });

        test('a player must remove at the maximum three tokens', () => {
            const nimGame = new NimGame({
                ...gameConfig,
                strategy
            });
            nimGame.start();

            expect(() => nimGame.playRound(4)).toThrowError();
        });

        test('a player can remove between one and three tokens', () => {
            range(1, 3)
                .forEach(tokensToRemove => {
                    const nimGame = new NimGame({
                        ...gameConfig,
                        strategy
                    });
                    nimGame.start();

                    let gameState: GameState;

                    expect(() => {
                        gameState = nimGame.playRound(tokensToRemove);
                    }).not.toThrowError();

                    const humanTurn = first(gameState.turns);
                    expect(humanTurn.tokensRemoved).toBe(tokensToRemove);

                    const machineTurn = last(gameState.turns);
                    expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(1);
                    expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(3);
                });
        });

        test('the machine plays the first turn automatically when the game starts and it is the starting player', () => {
            const nimGame = new NimGame({
                ...gameConfig,
                startingPlayer: Player.Machine,
                strategy
            });
            const gameState = nimGame.start();

            expect(gameState.heapSize).toBeLessThan(13);
            expect(gameState.heapSize).toBeGreaterThanOrEqual(13 - 3);
            expect(gameState.turns).toHaveLength(1);

            const machineTurn = first(gameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);
            expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(1);
            expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(3);
        });

        test('the machine plays its turn automatically after its opponents turn', () => {
            const tokensToRemove = 1;
            const nimGame = new NimGame({
                ...gameConfig,
                strategy
            });
            nimGame.start();

            const gameState = nimGame.playRound(tokensToRemove);

            const humanTurn = findLast(gameState.turns, turn => turn.player === Player.Human);
            expect(humanTurn.player).toBe(Player.Human);

            const machineTurn = last(gameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);

            expect(gameState.heapSize).toBeLessThan(13 - tokensToRemove);
        });

        describe('game ending', () => {
            let nimGame: NimGame;
            let gameState: GameState;

            beforeEach(() => {
                nimGame = new NimGame({
                    ...gameConfig,
                    strategy
                });
                nimGame.start();
                gameState = playGame(nimGame);
            });

            test.only('the game ends when the heap size is 0', () => {
                expect(gameState.heapSize).toBe(0);
            });

            test('the last round declares a winner', () => {
                expect(gameState.winner).not.toBeNull();
                expect([Player.Machine, Player.Human]).toContain(gameState.winner);
            });

            test('it is not possible to play another round after the game has finished', () => {
                expect(() => nimGame.playRound(1)).toThrowError();
            });
        });

    });

});

describe('machine strategy', () => {
    let mockStrategy;
    let getNextTurn: jest.SpyInstance;
    let nimGame: NimGame;

    beforeEach(() => {
        mockStrategy = getMockStrategy();
        getNextTurn = (<any> mockStrategy.getNextTurn);
    });

    test('when the machine is the starting player, it receives the current heap size to make its decision', () => {
        nimGame = new NimGame({
            ...gameConfig,
            startingPlayer: Player.Machine,
            strategy: mockStrategy
        });
        nimGame.start();

        expect(getNextTurn).toHaveBeenLastCalledWith({});
    });

    test('the machine receives the current heap size to make its decision', () => {
        const tokensToRemove = 1;
        nimGame = new NimGame({
            ...gameConfig,
            startingPlayer: Player.Human,
            strategy: mockStrategy
        });
        nimGame.start();

        const gameState = nimGame.playRound(tokensToRemove);
        const heapSizeAfterHumanTurn = 13 - findLast(gameState.turns, turn => turn.player === Player.Human).tokensRemoved;

        expect(getNextTurn).toHaveBeenLastCalledWith({});
    });
});
