import { GameState, Strategy } from '../nim.model';

export function alwaysMinStrategy(): Strategy {
    return {
        getNextTurn(gameState: GameState): number {
            return gameState.minTokensAllowedToRemove;
        }
    };
}
