import { NimGame, Round, Strategy } from '../index';

export const HEAP_SIZE = 13;
export const MIN_TOKENS_TO_REMOVE = 1;
export const MAX_TOKENS_TO_REMOVE = 3;

export function playGame(
    nimGame: NimGame,
    expectForEachRound: (round: Round) => void = () => undefined
): Round {
    const round = nimGame.playRound(MIN_TOKENS_TO_REMOVE);

    expectForEachRound(round);

    return round.isFinished ? round : playGame(nimGame);
}

export function getMockStrategy(): Strategy {
    return {
        getNextTurn: jest.fn(() => 1)
    };
}
