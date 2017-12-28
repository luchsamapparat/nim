import { StrategyFactory } from './nim.model';
import { alwaysMinStrategy } from './strategy/always-min';
import { mimicHumanStrategy } from './strategy/mimic-human';
import { randomStrategy } from './strategy/random';
import { remainderStrategy } from './strategy/remainder';

export function getStrategies(): StrategyFactory[] {
    return [
        alwaysMinStrategy,
        mimicHumanStrategy,
        randomStrategy,
        remainderStrategy
    ];
}
