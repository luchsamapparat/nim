import { GameFn } from './game';
import { Player } from './state';
import { StrategyName } from './strategy';

export interface GameConfig {
    heapSize: number;
    minTokensToRemove: number;
    maxTokensToRemove: number;
    startingPlayer: Player;
    strategy: StrategyName;
}

export const defaultGameConfig: GameConfig = {
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: Player.Human,
    strategy: StrategyName.RemainderStrategy
};

export function getStateFromConfig(): GameFn<GameConfig> {
    return gameConfig => ({
        heapSize: gameConfig.heapSize,
        minTokensAllowedToRemove: gameConfig.minTokensToRemove,
        maxTokensAllowedToRemove: gameConfig.maxTokensToRemove,
        turns: [],
        winner: null,
        config: gameConfig
    });
}

export function applyDefaultConfig(): (config: Partial<GameConfig>) => GameConfig {
    return gameConfig => ({
        ...defaultGameConfig,
        ...gameConfig
    });
}
