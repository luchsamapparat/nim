import { GameConfig, Player, StrategyName } from '../../index';
import { applyDefaultConfig, defaultGameConfig, getStateFromConfig } from '../../src/lib/config';
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

describe('applyDefaultConfig', () => {
    test('it sets the default values for all config properties that were not provided', () => {
        const config: Partial<GameConfig> = {};

        expect(applyDefaultConfig()(config)).toEqual(defaultGameConfig);
    });

    test('it leaves all provided config properties untouched', () => {
        const config: Partial<GameConfig> = {
            heapSize: 17,
            startingPlayer: Player.Machine
        };

        const expectedConfig = {
            ...defaultGameConfig,
            heapSize: 17,
            startingPlayer: Player.Machine
        };

        expect(applyDefaultConfig()(config)).toEqual(expectedConfig);
    });
});
