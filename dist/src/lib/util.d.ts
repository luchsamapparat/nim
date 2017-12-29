import { GameFn } from './game';
import { Predicate } from './predicates';
import { GameState } from './state';
export declare type GameErrorFn = (gameState: GameState) => string;
export declare function abortIf(predicate: Predicate, errorMessageFn: GameErrorFn): GameFn;
export declare function when(predicate: Predicate, whenTrueFn: GameFn): GameFn;
