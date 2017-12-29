import { GameConfig } from './config';
import { GameFn } from './game';
export declare enum Player {
    Human = "Human",
    Machine = "Machine",
}
export interface GameState {
    heapSize: number;
    minTokensAllowedToRemove: number;
    maxTokensAllowedToRemove: number;
    turns: Turn[];
    winner: Player | null;
    config: GameConfig;
}
export interface Turn {
    player: Player;
    tokensRemoved: number;
}
export declare function updateStateWithTurn(player: Player, tokensToRemove: number): GameFn;
