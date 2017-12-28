import { isNull, random } from 'lodash';
import { Game, GameConfig, GameState, Player, Strategy } from '../index';

export function playGame(game: Game): Game {
    const updatedGame = game.playNextRound(1);

    return isNull(updatedGame.state.winner) ? playGame(updatedGame) : updatedGame;
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
