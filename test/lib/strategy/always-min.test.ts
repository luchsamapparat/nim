import { Strategy, alwaysMinStrategy } from '../../../index';
import { getMockState } from '../../util';

describe('alwaysMinStrategy', () => {
    const gameState = getMockState();

    test('it always removes the minimum amount of tokens allowed to remove', () => {
        expect(alwaysMinStrategy(gameState)).toBe(gameState.minTokensAllowedToRemove);
    });
});
