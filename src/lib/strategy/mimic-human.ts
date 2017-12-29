import { isEmpty, last } from 'lodash';
import { StrategyFactory } from '../strategy';

export const mimicHumanStrategy: StrategyFactory = () => ({
    name: 'mimicHumanStrategy',
    getNextTurn({ turns, minTokensAllowedToRemove, maxTokensAllowedToRemove }): number {
        if (isEmpty(turns)) {
            return minTokensAllowedToRemove;
        }

        return Math.min(
            last(turns)!.tokensRemoved,
            maxTokensAllowedToRemove
        );
    }
});
