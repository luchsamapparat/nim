"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const nim_model_1 = require("./nim.model");
class NimGame {
    constructor(config) {
        this.gameState = this.getInitialGameState(config);
    }
    start() {
        let gameState = this.gameState;
        gameState = Object.assign({}, gameState, { started: true });
        if (this.gameState.config.startingPlayer === nim_model_1.Player.Machine) {
            gameState = Object.assign({}, gameState, this.playMachineTurn(gameState));
        }
        this.gameState = gameState;
        return gameState;
    }
    playRound(tokensToRemove) {
        let gameState = this.gameState;
        if (!gameState.started) {
            throw new Error(`You must start the game first.`);
        }
        gameState = this.playHumanTurn(gameState, tokensToRemove);
        if (lodash_1.isNull(gameState.winner)) {
            gameState = this.playMachineTurn(gameState);
        }
        this.gameState = gameState;
        return gameState;
    }
    playHumanTurn(gameState, tokensToRemove) {
        return this.playTurn(gameState, nim_model_1.Player.Human, tokensToRemove);
    }
    playMachineTurn(gameState) {
        return this.playTurn(gameState, nim_model_1.Player.Machine, this.gameState.config.strategy.getNextTurn(gameState));
    }
    playTurn(gameState, player, tokensToRemove) {
        if (!lodash_1.isNull(gameState.winner)) {
            throw new Error(`The game has already ended. ${gameState.winner} is the winner.`);
        }
        if (!lodash_1.inRange(tokensToRemove, gameState.minTokensAllowedToRemove, gameState.maxTokensAllowedToRemove + 1)) {
            throw new Error(`You may remove between ${gameState.minTokensAllowedToRemove} and ${gameState.maxTokensAllowedToRemove} tokens from the heap.`);
        }
        const turn = {
            player,
            tokensRemoved: tokensToRemove
        };
        const newHeapSize = gameState.heapSize - tokensToRemove;
        return Object.assign({}, gameState, { heapSize: newHeapSize, turns: [
                ...gameState.turns,
                turn
            ], maxTokensAllowedToRemove: newHeapSize > this.gameState.config.maxTokensToRemove ? this.gameState.config.maxTokensToRemove : newHeapSize, winner: (newHeapSize === 0) ? player : null });
    }
    getInitialGameState(config) {
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
exports.NimGame = NimGame;
