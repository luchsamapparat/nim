import { Strategy, alwaysMinStrategy } from '../../../index';
import { getMockState } from '../../util';

describe('AlwaysMinStrategy', () => {
    let strategy: Strategy;

    const gameState = getMockState();

    beforeEach(() => {
        strategy = alwaysMinStrategy();
    });

    test('it always removes the minimum amount of tokens allowed to remove', () => {
        expect(strategy.getNextTurn(gameState)).toBe(gameState.minTokensAllowedToRemove);
    });
});
