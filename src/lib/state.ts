import { flow } from 'lodash';
import { GameConfig } from './config';
import { GameFn } from './game';
import { isFinished } from './predicates';
import { when } from './util';

export enum Player {
    Human = 'Human',
    Machine = 'Machine'
}

export interface GameState {
    heapSize: number;
    minTokensAllowedToRemove: number;
    maxTokensAllowedToRemove: number;
    turns: Turn[];
    winner: Player | null;
    config: GameConfig;
}

export interface Turn {
    player: Player;
    tokensRemoved: number;
}

export function updateStateWithTurn(player: Player, tokensToRemove: number): GameFn {
    return flow(
        updateHeapSize(tokensToRemove),
        updateTokensAllowedToRemove(),
        addTurn(player, tokensToRemove),
        when(isFinished(), updateWinner(getOpponent(player)))
    );
}

function addTurn(player: Player, tokensRemoved: number): GameFn {
    return gameState => ({
        ...gameState,
        turns: [
            ...gameState.turns,
            toTurn(player, tokensRemoved)
        ]
    });
}

function updateHeapSize(tokensToRemove: number): GameFn {
    return gameState => ({
        ...gameState,
        heapSize: gameState.heapSize - tokensToRemove
    });
}

function updateTokensAllowedToRemove(): GameFn {
    return gameState => ({
        ...gameState,
        minTokensAllowedToRemove: Math.min(gameState.config.minTokensToRemove, gameState.heapSize),
        maxTokensAllowedToRemove: Math.min(gameState.config.maxTokensToRemove, gameState.heapSize)
    });
}

function updateWinner(winner: Player): GameFn {
    return gameState => ({
        ...gameState,
        winner
    });
}

function getOpponent(player: Player): Player {
    return (player === Player.Machine) ? Player.Human : Player.Machine;
}

function toTurn(player: Player, tokensRemoved: number): Turn {
    return {
        player,
        tokensRemoved
    };
}
