import { Strategy } from '../strategy';

export const alwaysMinStrategy: Strategy = ({ minTokensAllowedToRemove }): number => {
    return minTokensAllowedToRemove;
};
