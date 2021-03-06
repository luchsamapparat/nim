import { find, isUndefined } from 'lodash';
import { GameState } from './state';
import { alwaysMinStrategy } from './strategy/always-min';
import { mimicHumanStrategy } from './strategy/mimic-human';
import { randomStrategy } from './strategy/random';
import { remainderStrategy } from './strategy/remainder';

export * from './strategy/always-min';
export * from './strategy/mimic-human';
export * from './strategy/random';
export * from './strategy/remainder';

export type Strategy = (gameState: GameState) => number;

export enum StrategyName {
    AlwaysMinStrategy = 'alwaysMinStrategy',
    MimicHumanStrategy = 'mimicHumanStrategy',
    RandomStrategy = 'randomStrategy',
    RemainderStrategy = 'remainderStrategy'
}

export const strategies = {
    alwaysMinStrategy,
    mimicHumanStrategy,
    randomStrategy,
    remainderStrategy
};

export function getStrategy(strategyName: StrategyName): Strategy {
    const strategy = find(strategies, (fn, name) => name === strategyName)!;

    if (isUndefined(strategy)) {
        throw new Error(`${strategyName} is not a valid strategy.`);
    }

    return strategy;
}
