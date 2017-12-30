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
