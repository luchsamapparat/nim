import { inRange, isNull } from 'lodash';
import { GameConfig, GameState, Player } from './nim.model';

export function playNim(config: GameConfig) {
    let gameState = getInitialGameState(config);

    if (gameState.config.startingPlayer === Player.Machine) {
        gameState = {
            ...gameState,
            ...playMachineTurn(gameState)
        };
    }

    return gameState;
}

function getInitialGameState(config: GameConfig): GameState {
    return {
        heapSize: config.heapSize,
        minTokensAllowedToRemove: config.minTokensToRemove,
        maxTokensAllowedToRemove: config.maxTokensToRemove,
        turns: [],
        winner: null,
        config
    };
}

export function playRound(gameState: GameState, tokensToRemove: number): GameState {
    let updatedGameState = gameState;

    updatedGameState = playHumanTurn(updatedGameState, tokensToRemove);

    if (isNull(updatedGameState.winner)) {
        updatedGameState = playMachineTurn(updatedGameState);
    }

    return updatedGameState;
}

function playHumanTurn(gameState: GameState, tokensToRemove: number): GameState {
    return playTurn(
        gameState,
        Player.Human,
        tokensToRemove
    );
}

function playMachineTurn(gameState: GameState): GameState {
    return playTurn(
        gameState,
        Player.Machine,
        gameState.config.strategy.getNextTurn(gameState)
    );
}

function playTurn(gameState: GameState, player: Player, tokensToRemove: number): GameState {
    if (!isNull(gameState.winner)) {
        throw new Error(`The game has already ended. ${gameState.winner} is the winner.`);
    }

    if (!inRange(tokensToRemove, gameState.minTokensAllowedToRemove, gameState.maxTokensAllowedToRemove + 1)) {
        throw new Error(`You may remove between ${gameState.minTokensAllowedToRemove} and ${gameState.maxTokensAllowedToRemove} tokens from the heap.`);
    }

    const turn = {
        player,
        tokensRemoved: tokensToRemove
    };
    const newHeapSize = gameState.heapSize - tokensToRemove;

    return {
        ...gameState,
        heapSize: newHeapSize,
        turns: [
            ...gameState.turns,
            turn
        ],
        maxTokensAllowedToRemove: newHeapSize > gameState.config.maxTokensToRemove ? gameState.config.maxTokensToRemove : newHeapSize,
        winner: (newHeapSize === 0) ? player : null
    };
}
