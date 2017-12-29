import { flow } from 'lodash';
import { isFinished, isInvalidTurn } from './predicates';
import { GameState, Player, updateStateWithTurn } from './state';
import { abortIf } from './util';

export type GameFn<T = GameState> = (arg: T) => GameState;

export function playHumanTurn(tokensToRemove: number): GameFn {
    return playTurn(
        Player.Human,
        tokensToRemove
    );
}

export function playMachineTurn(): GameFn {
    return gameState => {
        return playTurn(Player.Machine, getNextTurn(gameState))(gameState);
    };
}

function getNextTurn(gameState: GameState): number {
    return gameState.config.strategy.getNextTurn(gameState);
}

function playTurn(player: Player, tokensToRemove: number): GameFn {
    return flow(
        abortIf(
            isInvalidTurn(tokensToRemove),
            ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => `You may remove between ${minTokensAllowedToRemove} and ${maxTokensAllowedToRemove} tokens from the heap. You tried to remove ${tokensToRemove} tokens.`
        ),
        abortIf(
            isFinished(),
            ({ winner }) => `The game has already ended. ${winner} is the winner.`
        ),
        updateStateWithTurn(player, tokensToRemove)
    );
}

