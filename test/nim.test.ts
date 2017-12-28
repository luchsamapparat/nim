import { findLast, first, last, range } from 'lodash';
import { Game, GameConfig, GameState, Player, Strategy, getStrategies, startGame } from '../index';
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
            const game = startGame({
                ...gameConfig,
                strategy
            });

            expect(game.state.heapSize).toBe(13);
        });

        test('a player must remove at least one token', () => {
            const game = startGame({
                ...gameConfig,
                strategy
            });

            expect(() => game.playNextRound(0)).toThrowError();
        });

        test('a player must remove at the maximum three tokens', () => {
            const game = startGame({
                ...gameConfig,
                strategy
            });

            expect(() => game.playNextRound(4)).toThrowError();
        });

        test('a player can remove between one and three tokens', () => {
            range(1, 3)
                .forEach(tokensToRemove => {
                    const game = startGame({
                        ...gameConfig,
                        strategy
                    });

                    let gameState: GameState;

                    expect(() => {
                        gameState = game.playNextRound(tokensToRemove).state;
                    }).not.toThrowError();

                    const humanTurn = first(gameState.turns);
                    expect(humanTurn.tokensRemoved).toBe(tokensToRemove);

                    const machineTurn = last(gameState.turns);
                    expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(1);
                    expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(3);
                });
        });

        test('the machine plays the first turn automatically when the game starts and it is the starting player', () => {
            const game = startGame({
                ...gameConfig,
                startingPlayer: Player.Machine,
                strategy
            });

            expect(game.state.heapSize).toBeLessThan(13);
            expect(game.state.heapSize).toBeGreaterThanOrEqual(13 - 3);
            expect(game.state.turns).toHaveLength(1);

            const machineTurn = first(game.state.turns);
            expect(machineTurn.player).toBe(Player.Machine);
            expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(1);
            expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(3);
        });

        test('the machine plays its turn automatically after its opponents turn', () => {
            const tokensToRemove = 1;
            const game = startGame({
                ...gameConfig,
                strategy
            });

            const gameState = game.playNextRound(tokensToRemove).state;

            const humanTurn = findLast(gameState.turns, turn => turn.player === Player.Human);
            expect(humanTurn.player).toBe(Player.Human);

            const machineTurn = last(gameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);

            expect(gameState.heapSize).toBeLessThan(13 - tokensToRemove);
        });

        describe('game ending', () => {
            let finishedGame: Game;

            beforeEach(() => {
                const game = startGame({
                    ...gameConfig,
                    strategy
                });
                finishedGame = playGame(game);
            });

            test('the game ends when the heap size is 0', () => {
                expect(finishedGame.state.heapSize).toBe(0);
            });

            test('the last round declares a winner', () => {
                expect(finishedGame.state.winner).not.toBeNull();
                expect([Player.Machine, Player.Human]).toContain(finishedGame.state.winner);
            });

            test('it is not possible to play another round after the game has finished', () => {
                expect(finishedGame.playNextRound).toBeNull();
            });
        });

    });

});

describe('machine strategy', () => {
    let mockStrategy;
    let getNextTurn: jest.SpyInstance;

    beforeEach(() => {
        mockStrategy = getMockStrategy();
        getNextTurn = (<any> mockStrategy.getNextTurn);
    });

    test('when the machine is the starting player, it receives the current game state to make its decision', () => {
        const config = {
            ...gameConfig,
            startingPlayer: Player.Machine,
            strategy: mockStrategy
        };
        startGame(config);

        const passedGameState: GameState = getNextTurn.mock.calls[0][0];

        expect(passedGameState.config).toEqual(config);
        expect(passedGameState.heapSize).toBe(config.heapSize);
        expect(passedGameState.minTokensAllowedToRemove).toBe(gameConfig.minTokensToRemove);
        expect(passedGameState.maxTokensAllowedToRemove).toBe(gameConfig.maxTokensToRemove);
        expect(passedGameState.turns).toHaveLength(0);
        expect(passedGameState.winner).toBeNull();
    });

    test('the machine receives the current game state to make its decision', () => {
        const tokensToRemove = 1;
        const config = {
            ...gameConfig,
            startingPlayer: Player.Human,
            strategy: mockStrategy
        };
        const game = startGame(config);

        game.playNextRound(tokensToRemove);
        const heapSizeAfterHumanTurn = 13 - tokensToRemove;

        const passedGameState: GameState = getNextTurn.mock.calls[0][0];

        expect(passedGameState.config).toEqual(config);
        expect(passedGameState.heapSize).toBe(heapSizeAfterHumanTurn);
        expect(passedGameState.minTokensAllowedToRemove).toBe(gameConfig.minTokensToRemove);
        expect(passedGameState.maxTokensAllowedToRemove).toBe(gameConfig.maxTokensToRemove);
        expect(passedGameState.turns).toHaveLength(1);
        expect(passedGameState.turns[0].player).toBe(Player.Human);
        expect(passedGameState.turns[0].tokensRemoved).toBe(tokensToRemove);
        expect(passedGameState.winner).toBeNull();
    });
});
