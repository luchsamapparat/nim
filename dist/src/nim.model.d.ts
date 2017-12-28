export declare enum Player {
    Human = "Human",
    Machine = "Machine",
}
export interface GameConfig {
    heapSize: number;
    minTokensToRemove: number;
    maxTokensToRemove: number;
    startingPlayer: Player;
    strategy: Strategy;
}
export interface GameState {
    heapSize: number;
    minTokensAllowedToRemove: number;
    maxTokensAllowedToRemove: number;
    started: boolean;
    turns: Turn[];
    winner: Player | null;
    config: GameConfig;
}
export interface Turn {
    player: Player;
    tokensRemoved: number;
}
export declare type StrategyFn = (gameState: GameState) => number;
export interface Strategy {
    getNextTurn: StrategyFn;
}
export declare type StrategyFactory = (...args: any[]) => Strategy;
