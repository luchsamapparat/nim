import { flow, negate } from 'lodash';
import { GameConfig, applyDefaultConfig, getStateFromConfig } from './lib/config';
import { GameFn, playHumanTurn, playMachineTurn } from './lib/game';
import { isFinished, isStartingPlayer } from './lib/predicates';
import { GameState, Player } from './lib/state';
import { when } from './lib/util';

export { GameConfig } from './lib/config';
export { GameState, Turn, Player } from './lib/state';
export { isFinished } from './lib/predicates';
export * from './lib/strategy';

export const startGame: GameFn<Partial<GameConfig>> = flow(
    applyDefaultConfig(),
    getStateFromConfig(),
    when(isStartingPlayer(Player.Machine), playMachineTurn())
);

export const playRound = (tokensToRemove: number): GameFn<GameState> => flow(
    playHumanTurn(tokensToRemove),
    when(negate(isFinished()), playMachineTurn())
);
