import { range } from 'lodash';
import { Player, Strategy, Turn, mimicHumanStrategy } from '../../../index';
import { getMockState } from '../../util';

describe('MimicHumanStrategy', () => {
    let strategy: Strategy;

    const gameState = getMockState();
    const gameConfig = gameState.config;

    beforeEach(() => {
        strategy = mimicHumanStrategy();
    });

    test('it removes the same amount of tokens as the player did before', () => {
        range(gameConfig.minTokensToRemove, gameConfig.maxTokensToRemove)
            .forEach(tokensRemoved => {
                const state = {
                    ...gameState,
                    turns: [{
                        player: Player.Human,
                        tokensRemoved
                    }]
                };

                expect(strategy.getNextTurn(state)).toBe(tokensRemoved);
            });
    });

    test('it removes the maximum amount of tokens possible if the player before removed more tokens than left on the heap', () => {
        const tokensRemoved = 3;
        const heapSize = tokensRemoved - 1;
        const state = {
            ...gameState,
            heapSize,
            maxTokensAllowedToRemove: heapSize,
            turns: [{
                player: Player.Human,
                tokensRemoved
            }]
        };

        expect(strategy.getNextTurn(state)).toBe(heapSize);
    });
});
