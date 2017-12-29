import { GameState } from './state';
export declare type GameFn<T = GameState> = (arg: T) => GameState;
export declare function playHumanTurn(tokensToRemove: number): GameFn;
export declare function playMachineTurn(): GameFn;
