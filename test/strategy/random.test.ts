import { Strategy, randomStrategy } from '../../index';
import { getMockConfig } from '../test-util';

describe('RandomStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = randomStrategy();
    });

    test(`it randomly removes between 1 and 3 tokens`, () => {
        expect(strategy.getNextTurn({
            heapSize: 13,
            minTokensAllowedToRemove: 1,
            maxTokensAllowedToRemove: 3,
            started: true,
            turns: [],
            winner: null,
            config: getMockConfig()
        })).toBeGreaterThanOrEqual(1);
        expect(strategy.getNextTurn({
            heapSize: 13,
            minTokensAllowedToRemove: 1,
            maxTokensAllowedToRemove: 3,
            started: true,
            turns: [],
            winner: null,
            config: getMockConfig()
        })).toBeLessThanOrEqual(3);
    });

    test(`it does not try to remove more tokens than left on the heap`, () => {
        expect(strategy.getNextTurn({
            heapSize: 1,
            minTokensAllowedToRemove: 1,
            maxTokensAllowedToRemove: 1,
            started: true,
            turns: [],
            winner: null,
            config: getMockConfig()
        })).toBe(1);
    });
});
