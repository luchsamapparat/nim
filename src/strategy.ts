import { getMaxTokensToRemove } from './util';

export interface Strategy {
    getNextTurn(heapSize: number): number;
}

export class RandomStrategy implements Strategy {
    public getNextTurn(heapSize: number): number {
        return Math.floor(Math.random() * getMaxTokensToRemove(heapSize)) + 1;
    }
}

export class AlwaysOneStrategy implements Strategy {
    public getNextTurn(heapSize: number): number {
        return 1;
    }
}
