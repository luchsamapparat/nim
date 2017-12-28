import { Strategy, alwaysMinStrategy } from '../../index';
import { getMockConfig } from '../test-util';

describe('AlwaysMinStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = alwaysMinStrategy();
    });

    test('it always removes the minimum amount of tokens allowed to remove', () => {
        expect(strategy.getNextTurn({
            heapSize: 13,
            minTokensAllowedToRemove: 1,
            maxTokensAllowedToRemove: 3,
            started: true,
            turns: [],
            winner: null,
            config: getMockConfig()
        })).toBe(1);
    });
});
