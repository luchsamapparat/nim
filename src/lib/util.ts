import { GameFn } from './game';
import { Predicate } from './predicates';
import { GameState } from './state';

export type GameErrorFn = (gameState: GameState) => string;

export function abortIf(predicate: Predicate, errorMessageFn: GameErrorFn): GameFn {
    return gameState => {
        if (predicate(gameState)) {
            throw new Error(errorMessageFn(gameState));
        }

        return gameState;
    };
}

export function when(predicate: Predicate, whenTrueFn: GameFn): GameFn {
    return gameState => predicate(gameState) ? whenTrueFn(gameState) : gameState;
}
