import { GameState } from './state';
import { alwaysMinStrategy } from './strategy/always-min';
import { mimicHumanStrategy } from './strategy/mimic-human';
import { randomStrategy } from './strategy/random';
import { remainderStrategy } from './strategy/remainder';

export * from './strategy/always-min';
export * from './strategy/mimic-human';
export * from './strategy/random';
export * from './strategy/remainder';

export type StrategyFn = (gameState: GameState) => number;

export interface Strategy {
    name: string;
    getNextTurn: StrategyFn;
}

export type StrategyFactory = (...args: any[]) => Strategy;


export function getStrategies(): StrategyFactory[] {
    return [
        alwaysMinStrategy,
        mimicHumanStrategy,
        randomStrategy,
        remainderStrategy
    ];
}
