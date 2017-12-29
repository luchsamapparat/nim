import { range } from 'lodash';
import { Strategy, remainderStrategy } from '../../../index';
import { getMockState } from '../../util';

describe('RemainderStrategy', () => {
    let strategy: Strategy;

    const gameState = getMockState();
    const gameConfig = gameState.config;

    const groupSize = gameConfig.minTokensToRemove + gameConfig.maxTokensToRemove;

    beforeEach(() => {
        strategy = remainderStrategy();
    });

    describe('try to get the heap size to (n * (MIN + MAX)) + MIN;', () => {

        range(0, groupSize)
            .map(remainder => {
                let numberOfTokensToRemove;

                // when there is no remainder, take the maximum number of tokens possible to leave a remainder equaling the minimum
                // else remove just enough tokens to achieve the same goal
                numberOfTokensToRemove = (remainder === 0) ? gameConfig.maxTokensToRemove : remainder - gameConfig.minTokensToRemove;

                // it is not allowed to remove less tokens than the minimum number, use the minimum number of tokens allowed
                if (numberOfTokensToRemove < gameConfig.minTokensToRemove) {
                    numberOfTokensToRemove = gameConfig.minTokensToRemove;
                }

                test(`when the remainder of the heap size divided by ${groupSize} is ${remainder}, remove ${numberOfTokensToRemove}`, () => {
                    getTestRange(groupSize, remainder)
                        .forEach(heapSize => {
                            const state = {
                                ...gameState,
                                heapSize
                            };
                            expect(strategy.getNextTurn(state)).toBe(numberOfTokensToRemove);
                        });
                });
            });
    });
});

function getTestRange(groupSize: number, remainder: number) {
    const rangeMultiplierFrom = 3;
    const rangeMultiplierTo = 6;
    return range((groupSize * rangeMultiplierFrom) + remainder, (groupSize * rangeMultiplierTo) + remainder, groupSize);
}
