import { StrategyFactory } from '../strategy';

export const alwaysMinStrategy: StrategyFactory = () => ({
    name: 'alwaysMinStrategy',
    getNextTurn({ minTokensAllowedToRemove }): number {
        return minTokensAllowedToRemove;
    }
});
