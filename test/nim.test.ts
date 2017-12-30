import { findLast, first, flow, forEach, last, range } from 'lodash';
import { GameConfig, GameState, Player, Strategy, StrategyName, playRound, startGame, strategies } from '../index';
import { getMockConfig, getMockStrategy, getPartialMockConfig, mockStrategyName, playGame } from './util';

const partialGameConfig = getPartialMockConfig();
const gameConfig = getMockConfig();

// tslint:disable-next-line:variable-name
Object.keys(strategies).forEach((strategy: StrategyName) => {

    describe(`NimGame with ${strategy}`, () => {
        test('the initial heap size is configurable', () => {
            const gameState = startGame({
                ...partialGameConfig,
                strategy
            });

            expect(gameState.heapSize).toBe(gameConfig.heapSize);
        });

        test('a player must remove at least the configured minimum number of tokens to remove', () => {
            const tooLowNumberOfTokensToRemove = gameConfig.minTokensToRemove - 1;
            const gameState = startGame({
                ...partialGameConfig,
                strategy
            });

            expect(() => playRound(tooLowNumberOfTokensToRemove)(gameState)).toThrowError();
        });

        test('a player must not remove more than configured maximum number of tokens to remove', () => {
            const tooHighNumberOfTokensToRemove = gameConfig.maxTokensToRemove + 1;
            const gameState = startGame({
                ...partialGameConfig,
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
                        ...partialGameConfig,
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
                ...partialGameConfig,
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
                ...partialGameConfig,
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
    const mockStrategy: jest.SpyInstance = (<any> getMockStrategy());

    beforeAll(() => {
        strategies[mockStrategyName] = mockStrategy;
    });

    afterAll(() => {
        delete strategies[mockStrategyName];
    });

    beforeEach(() => {
        mockStrategy.mockClear();
    });

    test('when the machine is the starting player, it receives the current game state to make its decision', () => {
        const config: Partial<GameConfig> = {
            ...partialGameConfig,
            startingPlayer: Player.Machine,
            strategy: (<any> mockStrategyName)
        };
        const expectedConfig: GameConfig = {
            ...gameConfig,
            ...config
        };
        startGame(config);

        const passedGameState: GameState = mockStrategy.mock.calls[0][0];

        expect(passedGameState.config).toEqual(expectedConfig);
        expect(passedGameState.heapSize).toBe(gameConfig.heapSize);
        expect(passedGameState.minTokensAllowedToRemove).toBe(gameConfig.minTokensToRemove);
        expect(passedGameState.maxTokensAllowedToRemove).toBe(gameConfig.maxTokensToRemove);
        expect(passedGameState.turns).toHaveLength(0);
        expect(passedGameState.winner).toBeNull();
    });

    test('the machine receives the current game state to make its decision', () => {
        const tokensToRemove = gameConfig.minTokensToRemove;
        const config: Partial<GameConfig> = {
            ...partialGameConfig,
            startingPlayer: Player.Human,
            strategy: (<any> mockStrategyName)
        };
        const expectedConfig: GameConfig = {
            ...gameConfig,
            ...config
        };
        const gameState = flow(
            startGame,
            playRound(tokensToRemove)
        )(config);

        const heapSizeAfterHumanTurn = gameConfig.heapSize - tokensToRemove;

        const passedGameState: GameState = mockStrategy.mock.calls[0][0];

        expect(passedGameState.config).toEqual(expectedConfig);
        expect(passedGameState.heapSize).toBe(heapSizeAfterHumanTurn);
        expect(passedGameState.minTokensAllowedToRemove).toBe(gameConfig.minTokensToRemove);
        expect(passedGameState.maxTokensAllowedToRemove).toBe(gameConfig.maxTokensToRemove);
        expect(passedGameState.turns).toHaveLength(1);
        expect(passedGameState.turns[0].player).toBe(Player.Human);
        expect(passedGameState.turns[0].tokensRemoved).toBe(tokensToRemove);
        expect(passedGameState.winner).toBeNull();
    });
});
