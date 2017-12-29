import { GameState } from './state';
export * from './strategy/always-min';
export * from './strategy/mimic-human';
export * from './strategy/random';
export * from './strategy/remainder';
export declare type StrategyFn = (gameState: GameState) => number;
export interface Strategy {
    name: string;
    getNextTurn: StrategyFn;
}
export declare type StrategyFactory = (...args: any[]) => Strategy;
export declare function getStrategies(): StrategyFactory[];
