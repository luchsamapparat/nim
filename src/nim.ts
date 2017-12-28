import { inRange, isNull } from 'lodash';
import { GameConfig, GameState, Player } from './nim.model';

export class NimGame {

    private gameState: GameState;

    constructor(
        config: GameConfig
    ) {
        this.gameState = this.getInitialGameState(config);
    }

    public start(): GameState {
        let gameState = this.gameState;

        gameState = {
            ...gameState,
            started: true
        };

        if (this.gameState.config.startingPlayer === Player.Machine) {
            gameState = {
                ...gameState,
                ...this.playMachineTurn(gameState)
            };
        }

        this.gameState = gameState;

        return gameState;
    }

    public playRound(tokensToRemove: number): GameState {
        let gameState = this.gameState;

        if (!gameState.started) {
            throw new Error(`You must start the game first.`);
        }

        gameState = this.playHumanTurn(gameState, tokensToRemove);

        if (isNull(gameState.winner)) {
            gameState = this.playMachineTurn(gameState);
        }

        this.gameState = gameState;

        return gameState;
    }

    private playHumanTurn(gameState: GameState, tokensToRemove: number): GameState {
        return this.playTurn(
            gameState,
            Player.Human,
            tokensToRemove
        );
    }

    private playMachineTurn(gameState: GameState): GameState {
        return this.playTurn(
            gameState,
            Player.Machine,
            this.gameState.config.strategy.getNextTurn(gameState)
        );
    }

    private playTurn(gameState: GameState, player: Player, tokensToRemove: number): GameState {
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
            maxTokensAllowedToRemove: newHeapSize > this.gameState.config.maxTokensToRemove ? this.gameState.config.maxTokensToRemove : newHeapSize,
            winner: (newHeapSize === 0) ? player : null
        };
    }

    private getInitialGameState(config: GameConfig): GameState {
        return {
            heapSize: config.heapSize,
            minTokensAllowedToRemove: config.minTokensToRemove,
            maxTokensAllowedToRemove: config.maxTokensToRemove,
            started: false,
            turns: [],
            winner: null,
            config
        };
    }

}
