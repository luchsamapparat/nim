import { last } from 'lodash';
import { GameState, Player } from '../../index';
import { updateStateWithTurn } from '../../src/lib/state';
import { getMockState } from '../util';

const initialState = getMockState();

describe('updateStateWithTurn', () => {
    test('updates the heap size', () => {
        const state = updateStateWithTurn(Player.Human, initialState.minTokensAllowedToRemove)(initialState);

        expect(state.heapSize).toBe(initialState.config.heapSize - initialState.minTokensAllowedToRemove);
    });

    describe('updates the number of tokens allowed to remove', () => {
        test('it sets the configured maximum number of tokens allowed to remove if the heap size is large enough', () => {
            const state = updateStateWithTurn(Player.Human, initialState.minTokensAllowedToRemove)(initialState);

            expect(state.maxTokensAllowedToRemove).toBe(initialState.config.maxTokensToRemove);
        });

        test('it sets the configured minimum number of tokens allowed to remove if the heap size is large enough', () => {
            const state = updateStateWithTurn(Player.Human, initialState.minTokensAllowedToRemove)(initialState);

            expect(state.minTokensAllowedToRemove).toBe(initialState.config.minTokensToRemove);
        });

        test('it sets the heap size as maximum number of tokens allowed to remove if the heap size is smaller than the configured limit', () => {
            const gameState: GameState = {
                ...initialState,
                heapSize: initialState.config.minTokensToRemove + initialState.config.maxTokensToRemove
            };

            const state = updateStateWithTurn(Player.Human, initialState.maxTokensAllowedToRemove)(gameState);

            expect(state.maxTokensAllowedToRemove).toBe(state.heapSize);
            expect(state.maxTokensAllowedToRemove).toBe(initialState.config.minTokensToRemove);
        });

        test('it sets the heap size as mimum number of tokens allowed to remove if the heap size is smaller than the configured limit', () => {
            const config = initialState.config;
            const gameState: GameState = {
                ...initialState,
                heapSize: config.minTokensToRemove + config.maxTokensToRemove,
                config: {
                    ...config,
                    minTokensToRemove: config.maxTokensToRemove,
                    maxTokensToRemove: config.maxTokensToRemove + config.maxTokensToRemove
                }
            };

            const state = updateStateWithTurn(Player.Human, initialState.maxTokensAllowedToRemove)(gameState);

            expect(state.minTokensAllowedToRemove).toBe(state.heapSize);
            expect(state.minTokensAllowedToRemove).toBe(config.minTokensToRemove);
        });
    });

    test('adds the turn to the list of turns', () => {
        const state = updateStateWithTurn(Player.Human, initialState.minTokensAllowedToRemove)(initialState);

        const turn = last(state.turns);

        expect(turn.player).toBe(Player.Human);
        expect(turn.tokensRemoved).toBe(initialState.minTokensAllowedToRemove);
    });

    test('sets the winner when it was the last turn', () => {
        const gameState: GameState = {
            ...initialState,
            heapSize: initialState.config.minTokensToRemove
        };

        const state = updateStateWithTurn(Player.Human, initialState.config.minTokensToRemove)(gameState);

        expect(state.winner).toBe(Player.Machine);
    });
});


// updateHeapSize(tokensToRemove),
// updateMaxTokensAllowedToRemove(),
// addTurn(player, tokensToRemove),
// when(isFinished(), updateWinner(player))
