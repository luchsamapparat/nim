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
export declare function getStateFromConfig(): GameFn<GameConfig>;
