"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strategy_1 = require("./strategy");
const util_1 = require("./util");
var Player;
(function (Player) {
    Player["Human"] = "Human";
    Player["Machine"] = "Machine";
})(Player = exports.Player || (exports.Player = {}));
class NimGame {
    constructor(heapSize, startingPlayer, strategy = new strategy_1.RemainderStrategy()) {
        this.heapSize = heapSize;
        this.startingPlayer = startingPlayer;
        this.strategy = strategy;
        this.started = false;
        this.winner = null;
    }
    start() {
        const turns = (this.startingPlayer === Player.Human) ? [] : [this.playMachineTurn()];
        this.started = true;
        return this.toRound(turns);
    }
    playRound(tokensToRemove) {
        if (!this.started) {
            throw new Error(`You must start the game first.`);
        }
        if (!this.isValidTurn(tokensToRemove)) {
            throw new Error(`You may remove between 1 to ${util_1.getMaxTokensToRemove(this.heapSize)} tokens from the heap.`);
        }
        const humanTurn = this.playHumanTurn(tokensToRemove);
        const machineTurn = this.playMachineTurn(humanTurn);
        const turns = [
            ...((humanTurn === null) ? [] : [humanTurn]),
            ...((machineTurn === null) ? [] : [machineTurn]),
        ];
        return this.toRound(turns);
    }
    playHumanTurn(tokensToRemove) {
        if (this.isFinished) {
            return null;
        }
        return this.playTurn(Player.Human, tokensToRemove);
    }
    playMachineTurn(humanTurn) {
        if (this.isFinished) {
            return null;
        }
        return this.playTurn(Player.Machine, this.strategy.getNextTurn(this.heapSize, humanTurn));
    }
    playTurn(player, tokensToRemove) {
        this.removeTokensFromHeap(tokensToRemove);
        if (this.isFinished) {
            this.winner = (player === Player.Machine) ? Player.Human : Player.Machine;
        }
        return {
            player,
            tokensRemoved: tokensToRemove
        };
    }
    removeTokensFromHeap(tokensToRemove) {
        this.heapSize = this.heapSize - tokensToRemove;
    }
    get isFinished() {
        return (this.heapSize === 0);
    }
    isValidTurn(tokensToRemove) {
        return (tokensToRemove > 0 &&
            tokensToRemove <= util_1.getMaxTokensToRemove(this.heapSize));
    }
    toRound(turns) {
        return {
            turns,
            heapSize: this.heapSize,
            isFinished: this.isFinished,
            winner: this.winner
        };
    }
}
exports.NimGame = NimGame;
