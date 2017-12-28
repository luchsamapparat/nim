import { findLast, first, last, range } from 'lodash';
import { GameConfig, GameState, Player, Strategy, getStrategies, playNim, playRound } from '../index';
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
            const initialGameState = playNim({
                ...gameConfig,
                strategy
            });

            expect(initialGameState.heapSize).toBe(13);
        });

        test('a player must remove at least one token', () => {
            const initialGameState = playNim({
                ...gameConfig,
                strategy
            });

            expect(() => playRound(initialGameState, 0)).toThrowError();
        });

        test('a player must remove at the maximum three tokens', () => {
            const initialGameState = playNim({
                ...gameConfig,
                strategy
            });

            expect(() => playRound(initialGameState, 4)).toThrowError();
        });

        test('a player can remove between one and three tokens', () => {
            range(1, 3)
                .forEach(tokensToRemove => {
                    const initialGameState = playNim({
                        ...gameConfig,
                        strategy
                    });

                    let updatedGameState: GameState;

                    expect(() => {
                        updatedGameState = playRound(initialGameState, tokensToRemove);
                    }).not.toThrowError();

                    const humanTurn = first(updatedGameState.turns);
                    expect(humanTurn.tokensRemoved).toBe(tokensToRemove);

                    const machineTurn = last(updatedGameState.turns);
                    expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(1);
                    expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(3);
                });
        });

        test('the machine plays the first turn automatically when the game starts and it is the starting player', () => {
            const initialGameState = playNim({
                ...gameConfig,
                startingPlayer: Player.Machine,
                strategy
            });

            expect(initialGameState.heapSize).toBeLessThan(13);
            expect(initialGameState.heapSize).toBeGreaterThanOrEqual(13 - 3);
            expect(initialGameState.turns).toHaveLength(1);

            const machineTurn = first(initialGameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);
            expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(1);
            expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(3);
        });

        test('the machine plays its turn automatically after its opponents turn', () => {
            const tokensToRemove = 1;
            const initialGameState = playNim({
                ...gameConfig,
                strategy
            });

            const updatedGameState = playRound(initialGameState, tokensToRemove);

            const humanTurn = findLast(updatedGameState.turns, turn => turn.player === Player.Human);
            expect(humanTurn.player).toBe(Player.Human);

            const machineTurn = last(updatedGameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);

            expect(updatedGameState.heapSize).toBeLessThan(13 - tokensToRemove);
        });

        describe('game ending', () => {
            let gameState: GameState;

            beforeEach(() => {
                const initialGameState = playNim({
                    ...gameConfig,
                    strategy
                });
                gameState = playGame(initialGameState);
            });

            test('the game ends when the heap size is 0', () => {
                expect(gameState.heapSize).toBe(0);
            });

            test('the last round declares a winner', () => {
                expect(gameState.winner).not.toBeNull();
                expect([Player.Machine, Player.Human]).toContain(gameState.winner);
            });

            test('it is not possible to play another round after the game has finished', () => {
                expect(() => playRound(gameState, 1)).toThrowError();
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
        playNim(config);

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
        const initialGameState = playNim(config);

        const gameState = playRound(initialGameState, tokensToRemove);
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
