import { random } from 'lodash';
import { GameState, Strategy } from '../nim.model';

export function randomStrategy(): Strategy {
    return {
        getNextTurn(gameState: GameState): number {
            return random(
                gameState.minTokensAllowedToRemove,
                gameState.maxTokensAllowedToRemove
            );
        }
    };
}
