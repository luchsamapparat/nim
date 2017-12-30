import { random } from 'lodash';
import { Strategy } from '../strategy';

export const randomStrategy: Strategy = ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }): number => {
    return random(
        minTokensAllowedToRemove,
        maxTokensAllowedToRemove
    );
};
