import { AlwaysOneStrategy, getStrategies, MimicHumanStrategy, Player, RandomStrategy, RemainderStrategy, Strategy, Turn } from '../index';
import { HEAP_SIZE } from './test-util';

describe('getStrategies', () => {
    test('it returns all strategies', () => {
        expect(getStrategies()).toEqual([
            RandomStrategy,
            AlwaysOneStrategy,
            MimicHumanStrategy,
            RemainderStrategy
        ]);
    });
});

describe('RandomStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = new RandomStrategy();
    });

    test('it randomly removes between 1 and 3 tokens', () => {
        expect(strategy.getNextTurn(HEAP_SIZE)).toBeGreaterThanOrEqual(1);
        expect(strategy.getNextTurn(HEAP_SIZE)).toBeLessThanOrEqual(3);
    });
});

describe('AlwaysOneStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = new AlwaysOneStrategy();
    });

    test('it always removes 1 token', () => {
        expect(strategy.getNextTurn(HEAP_SIZE)).toBe(1);
    });
});

describe('MimicHumanStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = new MimicHumanStrategy();
    });

    test('it removes the same amount of tokens as the player did before', () => {
        [1, 2, 3]
            .forEach(tokensRemoved => {
                const previousTurn: Turn = {
                    player: Player.Human,
                    tokensRemoved
                };
                expect(strategy.getNextTurn(HEAP_SIZE, previousTurn)).toBe(tokensRemoved);
            });
    });

    test('it removes the maximum amount of tokens possible if the player before removed more tokens than left on the heap', () => {
        const tokensRemoved = 3;
        const heapSize = tokensRemoved - 1;

        const previousTurn: Turn = {
            player: Player.Human,
            tokensRemoved
        };
        expect(strategy.getNextTurn(heapSize, previousTurn)).toBe(heapSize);
    });
});

describe('RemainderStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = new RemainderStrategy();
    });

    describe('try to get the heap size to (n * 4) + 1;', () => {
        test('it removes 3 when the remainder of the heap size divided by 4 is 0', () => {
            [12, 16, 20]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn(heapSize)).toBe(3);
                });
        });

        test('it removes 1 when the remainder of the heap size divided by 4 is 1', () => {
            [13, 17, 21]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn(heapSize)).toBe(1);
                });
        });

        test('it removes 1 when the remainder of the heap size divided by 4 is 2', () => {
            [14, 18, 22]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn(heapSize)).toBe(1);
                });
        });

        test('it removes 2 when the remainder of the heap size divided by 4 is 3', () => {
            [15, 19, 23]
                .forEach(heapSize => {
                    expect(strategy.getNextTurn(heapSize)).toBe(2);
                });
        });
    });
});
