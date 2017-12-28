import { isNull, random } from 'lodash';
import { GameConfig, GameState, NimGame, Player, Strategy } from '../index';

export function playGame(nimGame: NimGame): GameState {
    const gameState = nimGame.playRound(1);

    return isNull(gameState.winner) ? playGame(nimGame) : gameState;
}

export function getMockStrategy(): Strategy {
    return {
        getNextTurn: jest.fn(
            (gameState: GameState) => random(gameState.minTokensAllowedToRemove, gameState.maxTokensAllowedToRemove)
        )
    };
}

export function getMockConfig(): GameConfig {
    return {
        heapSize: 13,
        minTokensToRemove: 1,
        maxTokensToRemove: 3,
        startingPlayer: Player.Human,
        strategy: getMockStrategy()
    };
}
