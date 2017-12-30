import { GameConfig } from './lib/config';
import { GameFn } from './lib/game';
import { GameState } from './lib/state';
export { GameConfig } from './lib/config';
export { GameState, Turn, Player } from './lib/state';
export { isFinished } from './lib/predicates';
export * from './lib/strategy';
export declare const startGame: GameFn<Partial<GameConfig>>;
export declare const playRound: (tokensToRemove: number) => GameFn<GameState>;
