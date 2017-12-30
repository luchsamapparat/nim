import { GameState } from './state';
export * from './strategy/always-min';
export * from './strategy/mimic-human';
export * from './strategy/random';
export * from './strategy/remainder';
export declare type Strategy = (gameState: GameState) => number;
export declare enum StrategyName {
    AlwaysMinStrategy = "alwaysMinStrategy",
    MimicHumanStrategy = "mimicHumanStrategy",
    RandomStrategy = "randomStrategy",
    RemainderStrategy = "remainderStrategy",
}
export declare const strategies: {
    alwaysMinStrategy: Strategy;
    mimicHumanStrategy: Strategy;
    randomStrategy: Strategy;
    remainderStrategy: Strategy;
};
export declare function getStrategy(strategyName: StrategyName): Strategy;
