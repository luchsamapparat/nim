import { Strategy, remainderStrategy } from '../../index';
import { getMockConfig } from '../test-util';

describe('RemainderStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = remainderStrategy();
    });

    describe('try to get the heap size to (n * (MIN + MAX)) + MIN;', () => {
        test('it removes 3 when the remainder of the heap size divided by 4 is 0', () => {
            [12, 16, 20]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn({
                        heapSize,
                        minTokensAllowedToRemove: 1,
                        maxTokensAllowedToRemove: 3,
                        started: true,
                        turns: [],
                        winner: null,
                        config: getMockConfig()
                    })).toBe(3);
                });
        });

        test('it removes 1 when the remainder of the heap size divided by 4 is 1', () => {
            [13, 17, 21]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn({
                        heapSize,
                        minTokensAllowedToRemove: 1,
                        maxTokensAllowedToRemove: 3,
                        started: true,
                        turns: [],
                        winner: null,
                        config: getMockConfig()
                    })).toBe(1);
                });
        });

        test('it removes 1 when the remainder of the heap size divided by 4 is 2', () => {
            [14, 18, 22]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn({
                        heapSize,
                        minTokensAllowedToRemove: 1,
                        maxTokensAllowedToRemove: 3,
                        started: true,
                        turns: [],
                        winner: null,
                        config: getMockConfig()
                    })).toBe(1);
                });
        });

        test('it removes 2 when the remainder of the heap size divided by 4 is 3', () => {
            [15, 19, 23]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn({
                        heapSize,
                        minTokensAllowedToRemove: 1,
                        maxTokensAllowedToRemove: 3,
                        started: true,
                        turns: [],
                        winner: null,
                        config: getMockConfig()
                    })).toBe(2);
                });
        });
    });
});
