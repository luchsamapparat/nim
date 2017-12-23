import { Turn } from './nim';
import { getMaxTokensToRemove } from './util';

export interface Strategy {
    getNextTurn(heapSize: number, previousTurn?: Turn): number;
}

export type StrategyImpl = (typeof RandomStrategy | typeof AlwaysOneStrategy | typeof MimicHumanStrategy | typeof RemainderStrategy);

export function getStrategies(): StrategyImpl[] {
    return [
        RandomStrategy,
        AlwaysOneStrategy,
        MimicHumanStrategy,
        RemainderStrategy
    ];
}

export class RandomStrategy implements Strategy {
    public getNextTurn(heapSize: number, previousTurn?: Turn): number {
        return Math.floor(Math.random() * getMaxTokensToRemove(heapSize)) + 1;
    }
}

export class AlwaysOneStrategy implements Strategy {
    public getNextTurn(heapSize: number, previousTurn?: Turn): number {
        return 1;
    }
}

export class MimicHumanStrategy implements Strategy {
    public getNextTurn(heapSize: number, previousTurn?: Turn): number {
        let tokensToRemove = 1;

        if (!isUndefined(previousTurn)) {
            tokensToRemove = Math.min(
                previousTurn.tokensRemoved,
                getMaxTokensToRemove(heapSize)
            );
        }

        return tokensToRemove;
    }
}

export class RemainderStrategy implements Strategy {
    public getNextTurn(heapSize: number, previousTurn?: Turn): number {
        const remainderAfterDivisionBy4 = heapSize % 4;

        switch (remainderAfterDivisionBy4) {
            case 0:
                return 3;
            case 1:
                return 1;
            case 2:
                return 1;
            case 3:
                return 2;
        }
    }
}

function isUndefined(previousTurn: Turn) {
    return (typeof previousTurn === 'undefined');
}
