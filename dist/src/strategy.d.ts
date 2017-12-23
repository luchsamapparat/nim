export interface Strategy {
    getNextTurn(heapSize: number): number;
}
export declare class RandomStrategy implements Strategy {
    getNextTurn(heapSize: number): number;
}
export declare class AlwaysOneStrategy implements Strategy {
    getNextTurn(heapSize: number): number;
}
