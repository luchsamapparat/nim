import { inRange } from 'lodash';
import { GameConfig } from './config';
import { GameState, Player } from './state';

export type Predicate<T = GameState> = (gameState: T) => boolean;

export function isInvalidTurn(tokensToRemove: number): Predicate {
    return ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => !inRange(tokensToRemove, minTokensAllowedToRemove, maxTokensAllowedToRemove + 1);
}

export function isStartingPlayer(player: Player): Predicate {
    return ({ config }) => (config.startingPlayer === player);
}

export function isFinished(): Predicate {
    return ({ heapSize }) => (heapSize === 0);
}
