import { GameState, Player } from './state';
export declare type Predicate<T = GameState> = (gameState: T) => boolean;
export declare function isInvalidTurn(tokensToRemove: number): Predicate;
export declare function isStartingPlayer(player: Player): Predicate;
export declare function isFinished(): Predicate;
