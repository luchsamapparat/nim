import { GameFn } from './game';
import { Player } from './state';
import { Strategy } from './strategy';
export interface GameConfig {
    heapSize: number;
    minTokensToRemove: number;
    maxTokensToRemove: number;
    startingPlayer: Player;
    strategy: Strategy;
}
export declare function getStateFromConfig(): GameFn<GameConfig>;
