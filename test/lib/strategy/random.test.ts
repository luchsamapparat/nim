import { Strategy, randomStrategy } from '../../../index';
import { getMockState } from '../../util';

describe('RandomStrategy', () => {
    let strategy: Strategy;

    const gameState = getMockState();
    const gameConfig = gameState.config;

    beforeEach(() => {
        strategy = randomStrategy();
    });

    test(`it randomly removes between ${gameConfig.minTokensToRemove} and ${gameConfig.maxTokensToRemove} tokens`, () => {
        expect(strategy.getNextTurn(gameState)).toBeGreaterThanOrEqual(gameConfig.minTokensToRemove);
        expect(strategy.getNextTurn(gameState)).toBeLessThanOrEqual(gameConfig.maxTokensToRemove);
    });

    test(`it does not try to remove more tokens than left on the heap`, () => {
        const state = {
            ...gameState,
            heapSize: gameConfig.minTokensToRemove,
            minTokensAllowedToRemove: gameConfig.minTokensToRemove,
            maxTokensAllowedToRemove: gameConfig.minTokensToRemove
        };

        expect(strategy.getNextTurn(state)).toBe(gameConfig.minTokensToRemove);
    });
});
