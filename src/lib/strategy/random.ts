import { random } from 'lodash';
import { StrategyFactory } from '../strategy';

export const randomStrategy: StrategyFactory = () => ({
    name: 'randomStrategy',
    getNextTurn({ minTokensAllowedToRemove, maxTokensAllowedToRemove }): number {
        return random(
            minTokensAllowedToRemove,
            maxTokensAllowedToRemove
        );
    }
});
