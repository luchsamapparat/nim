import { isEmpty, last } from 'lodash';
import { Strategy } from '../strategy';

export const mimicHumanStrategy: Strategy = ({ turns, minTokensAllowedToRemove, maxTokensAllowedToRemove }): number  => {
    if (isEmpty(turns)) {
        return minTokensAllowedToRemove;
    }

    return Math.min(
        last(turns)!.tokensRemoved,
        maxTokensAllowedToRemove
    );
};
