import { Strategy, randomStrategy } from '../../../index';
import { getMockState } from '../../util';

describe('RandomStrategy', () => {
    const gameState = getMockState();
    const gameConfig = gameState.config;

    test(`it randomly removes between ${gameConfig.minTokensToRemove} and ${gameConfig.maxTokensToRemove} tokens`, () => {
        expect(randomStrategy(gameState)).toBeGreaterThanOrEqual(gameConfig.minTokensToRemove);
        expect(randomStrategy(gameState)).toBeLessThanOrEqual(gameConfig.maxTokensToRemove);
    });

    test(`it does not try to remove more tokens than left on the heap`, () => {
        const state = {
            ...gameState,
            heapSize: gameConfig.minTokensToRemove,
            minTokensAllowedToRemove: gameConfig.minTokensToRemove,
            maxTokensAllowedToRemove: gameConfig.minTokensToRemove
        };

        expect(randomStrategy(state)).toBe(gameConfig.minTokensToRemove);
    });
});
