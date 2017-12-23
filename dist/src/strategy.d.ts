import { Turn } from './nim';
export interface Strategy {
    getNextTurn(heapSize: number, previousTurn?: Turn): number;
}
export declare type StrategyImpl = (typeof RandomStrategy | typeof AlwaysOneStrategy | typeof MimicHumanStrategy | typeof RemainderStrategy);
export declare function getStrategies(): StrategyImpl[];
export declare class RandomStrategy implements Strategy {
    getNextTurn(heapSize: number, previousTurn?: Turn): number;
}
export declare class AlwaysOneStrategy implements Strategy {
    getNextTurn(heapSize: number, previousTurn?: Turn): number;
}
export declare class MimicHumanStrategy implements Strategy {
    getNextTurn(heapSize: number, previousTurn?: Turn): number;
}
export declare class RemainderStrategy implements Strategy {
    getNextTurn(heapSize: number, previousTurn?: Turn): number;
}
