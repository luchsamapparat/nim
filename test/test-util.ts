import { isNull, random } from 'lodash';
import { GameConfig, GameState, Player, Strategy, playRound } from '../index';

export function playGame(gameState: GameState): GameState {
    const updatedGameState = playRound(gameState, 1);

    return isNull(updatedGameState.winner) ? playGame(updatedGameState) : updatedGameState;
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
