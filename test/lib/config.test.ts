import { getStateFromConfig } from '../../src/lib/config';
import { getMockConfig } from '../util';

describe('getStateFromConfig', () => {
    test('it creates a game from the given game configuration', () => {
        const gameConfig = getMockConfig();
        const gameState = getStateFromConfig()(gameConfig);

        expect(gameState.config).toBe(gameConfig);
        expect(gameState.heapSize).toBe(gameConfig.heapSize);
        expect(gameState.maxTokensAllowedToRemove).toBe(gameConfig.maxTokensToRemove);
        expect(gameState.minTokensAllowedToRemove).toBe(gameConfig.minTokensToRemove);
        expect(gameState.turns).toEqual([]);
        expect(gameState.winner).toBeNull();
    });
});
