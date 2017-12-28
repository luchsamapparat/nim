import { range } from 'lodash';
import { Player, Strategy, Turn, mimicHumanStrategy } from '../../index';
import { getMockConfig } from '../test-util';

describe('MimicHumanStrategy', () => {
    let strategy: Strategy;

    beforeEach(() => {
        strategy = mimicHumanStrategy();
    });

    test('it removes the same amount of tokens as the player did before', () => {
        range(1, 3)
            .forEach(tokensRemoved => {
                const previousTurn: Turn = {
                    player: Player.Human,
                    tokensRemoved
                };
                expect(strategy.getNextTurn({
                    heapSize: 13,
                    minTokensAllowedToRemove: 1,
                    maxTokensAllowedToRemove: 3,
                    started: true,
                    turns: [previousTurn],
                    winner: null,
                    config: getMockConfig()
                })).toBe(tokensRemoved);
            });
    });

    test('it removes the maximum amount of tokens possible if the player before removed more tokens than left on the heap', () => {
        const tokensRemoved = 3;
        const heapSize = tokensRemoved - 1;

        const previousTurn: Turn = {
            player: Player.Human,
            tokensRemoved
        };
        expect(strategy.getNextTurn({
            heapSize,
            minTokensAllowedToRemove: 1,
            maxTokensAllowedToRemove: heapSize,
            started: true,
            turns: [previousTurn],
            winner: null,
            config: getMockConfig()
        })).toBe(heapSize);
    });
});
