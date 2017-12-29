import { findLast, first, flow, last, range } from 'lodash';
import { GameConfig, GameState, Player, Strategy, getStrategies, playRound, startGame } from '../index';
import { getMockConfig, getMockStrategy, playGame } from './util';

const gameConfig = getMockConfig();

// tslint:disable-next-line:variable-name
getStrategies().forEach(strategyFactory => {
    const strategy = strategyFactory();

    describe(`NimGame with ${strategy.name}`, () => {
        test('the initial heap size is configurable', () => {
            const gameState = startGame({
                ...gameConfig,
                strategy
            });

            expect(gameState.heapSize).toBe(gameConfig.heapSize);
        });

        test('a player must remove at least the configured minimum number of tokens to remove', () => {
            const tooLowNumberOfTokensToRemove = gameConfig.minTokensToRemove - 1;
            const gameState = startGame({
                ...gameConfig,
                strategy
            });

            expect(() => playRound(tooLowNumberOfTokensToRemove)(gameState)).toThrowError();
        });

        test('a player must not remove more than configured maximum number of tokens to remove', () => {
            const tooHighNumberOfTokensToRemove = gameConfig.maxTokensToRemove + 1;
            const gameState = startGame({
                ...gameConfig,
                strategy
            });

            expect(() => playRound(tooHighNumberOfTokensToRemove)(gameState)).toThrowError();
        });

        test('a player can remove between the minimum and maximum number of tokens to remove', () => {
            range(
                gameConfig.minTokensToRemove,
                gameConfig.maxTokensToRemove
            )
                .forEach(tokensToRemove => {
                    const gameState = flow(
                        startGame,
                        playRound(tokensToRemove)
                    )({
                        ...gameConfig,
                        strategy
                    });

                    const humanTurn = first(gameState.turns);
                    expect(humanTurn.tokensRemoved).toBe(tokensToRemove);

                    const machineTurn = last(gameState.turns);
                    expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(gameConfig.minTokensToRemove);
                    expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(gameConfig.maxTokensToRemove);
                });
        });

        test('the machine plays the first turn automatically when the game starts and it is the starting player', () => {
            const gameState = startGame({
                ...gameConfig,
                startingPlayer: Player.Machine,
                strategy
            });

            expect(gameState.heapSize).toBeLessThan(gameConfig.heapSize);
            expect(gameState.heapSize).toBeGreaterThanOrEqual(gameConfig.heapSize - gameConfig.maxTokensToRemove);
            expect(gameState.turns).toHaveLength(1);

            const machineTurn = first(gameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);
            expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(gameConfig.minTokensToRemove);
            expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(gameConfig.maxTokensToRemove);
        });

        test('the machine plays its turn automatically after its opponents turn', () => {
            const tokensToRemove = gameConfig.minTokensToRemove;
            const gameState = flow(
                startGame,
                playRound(tokensToRemove)
            )({
                ...gameConfig,
                strategy
            });

            const humanTurn = findLast(gameState.turns, turn => turn.player === Player.Human);
            expect(humanTurn.player).toBe(Player.Human);

            const machineTurn = last(gameState.turns);
            expect(machineTurn.player).toBe(Player.Machine);

            expect(gameState.heapSize).toBeLessThan(gameConfig.heapSize - tokensToRemove);
        });

        describe('game ending', () => {
            let finishedGameState: GameState;

            beforeEach(() => {
                finishedGameState = flow(
                    startGame,
                    playGame()
                )({
                    ...gameConfig,
                    strategy
                });
            });

            test('the game ends when the heap size is 0', () => {
                expect(finishedGameState.heapSize).toBe(0);
            });

            test('the last round declares a winner', () => {
                expect(finishedGameState.winner).not.toBeNull();
                expect([Player.Machine, Player.Human]).toContain(finishedGameState.winner);
            });

            test('it is not possible to play another round after the game has finished', () => {
                const tokensToRemove = gameConfig.minTokensToRemove;
                expect(() => playRound(tokensToRemove)(finishedGameState)).toThrowError();
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
        const tokensToRemove = gameConfig.minTokensToRemove;
        const config = {
            ...gameConfig,
            startingPlayer: Player.Human,
            strategy: mockStrategy
        };
        const gameState = flow(
            startGame,
            playRound(tokensToRemove)
        )(config);

        const heapSizeAfterHumanTurn = config.heapSize - tokensToRemove;

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
