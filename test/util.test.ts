import { getMaxTokensToRemove, NimGame, Player, Round } from '../index';
import { HEAP_SIZE, MAX_TOKENS_TO_REMOVE, MIN_TOKENS_TO_REMOVE, playGame } from './test-util';

describe('amount of tokens allowed to be removed', () => {
    test('initially the amount of tokens allowed to be removed is the maximum amount of tokens to be removed', () => {
        const nimGame = new NimGame(HEAP_SIZE, Player.Human);
        const round = nimGame.start();

        expect(getMaxTokensToRemove(round.heapSize)).toBe(MAX_TOKENS_TO_REMOVE);
    });

    test('the amount of tokens allowed to be removed may not exceed the current heap size', () => {
        const nimGame = new NimGame(HEAP_SIZE, Player.Human);
        nimGame.start();

        playGame(
            nimGame,
            round => {
                expect(getMaxTokensToRemove(round.heapSize)).toBeGreaterThan(MIN_TOKENS_TO_REMOVE);
                expect(getMaxTokensToRemove(round.heapSize)).toBeLessThanOrEqual(MAX_TOKENS_TO_REMOVE);
                expect(getMaxTokensToRemove(round.heapSize)).toBeLessThanOrEqual(round.heapSize);
            }
        );
    });
});
