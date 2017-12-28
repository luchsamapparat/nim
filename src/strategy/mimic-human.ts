import { isEmpty, last } from 'lodash';
import { GameState, Strategy, Turn } from '../nim.model';

export function mimicHumanStrategy(): Strategy {
    return {
        getNextTurn(gameState: GameState): number {
            if (isEmpty(gameState.turns)) {
                return gameState.minTokensAllowedToRemove;
            }

            return Math.min(
                (<Turn> last(gameState.turns)).tokensRemoved,
                gameState.maxTokensAllowedToRemove
            );
        }
    };
}
