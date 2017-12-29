import { range } from 'lodash';
import { GameState, Player } from '../../index';
import { isFinished, isInvalidTurn, isStartingPlayer } from '../../src/lib/predicates';
import { getMockState } from '../util';

const initialState = getMockState();

describe('isInvalidTurn', () => {
    test('it returns true if the given number of tokens to remove is too low', () => {
        const tooLowNumberOfTokensToRemove = initialState.minTokensAllowedToRemove - 1;

        expect(isInvalidTurn(tooLowNumberOfTokensToRemove)(initialState)).toBe(true);
    });

    test('it returns true if the given number of tokens to remove is too high', () => {
        const tooHighNumberOfTokensToRemove = initialState.maxTokensAllowedToRemove + 1;

        expect(isInvalidTurn(tooHighNumberOfTokensToRemove)(initialState)).toBe(true);
    });

    test('it returns fals if the given number of tokens to remove is valid', () => {
        range(
            initialState.minTokensAllowedToRemove,
            initialState.maxTokensAllowedToRemove
        )
            .map(tokensToRemove => {
                expect(isInvalidTurn(tokensToRemove)(initialState)).toBe(false);
            });
    });
});

describe('isStartingPlayer', () => {
    const state: GameState = {
        ...initialState,
        config: {
            ...initialState.config,
            startingPlayer: Player.Human
        }
    };

    test('it returns true if the given player is the starting player', () => {
        expect(isStartingPlayer(Player.Human)(state)).toBe(true);
    });

    test('it returns false if the given player is not the starting player', () => {
        expect(isStartingPlayer(Player.Machine)(state)).toBe(false);
    });
});

describe('isFinished', () => {
    it('returns true if the heap size is 0', () => {
        const state: GameState = {
            ...initialState,
            heapSize: 0
        };

        expect(isFinished()(state)).toBe(true);
    });

    it('returns false if the heap size is not 0', () => {
        const state: GameState = {
            ...initialState,
            heapSize: 1
        };

        expect(isFinished()(state)).toBe(false);
    });
});
