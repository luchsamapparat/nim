"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player;
(function (Player) {
    Player["Human"] = "Human";
    Player["Machine"] = "Machine";
})(Player = exports.Player || (exports.Player = {}));
class NimGame {
    constructor(heapSize, startingPlayer) {
        this.heapSize = heapSize;
        this.startingPlayer = startingPlayer;
        this.started = false;
        this.winner = null;
    }
    getMaxTokensToRemove() {
        return (this.heapSize) > 3 ? 3 : this.heapSize;
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
            throw new Error(`You may remove between 1 to ${this.getMaxTokensToRemove()} tokens from the heap.`);
        }
        const turns = [
            ...(this.isFinished ? [] : [this.playHumanTurn(tokensToRemove)]),
            ...(this.isFinished ? [] : [this.playMachineTurn()])
        ];
        return this.toRound(turns);
    }
    playHumanTurn(tokensToRemove) {
        return this.playTurn(Player.Human, tokensToRemove);
    }
    playMachineTurn() {
        return this.playTurn(Player.Machine, this.getRandomTurn());
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
            tokensToRemove <= this.getMaxTokensToRemove());
    }
    toRound(turns) {
        return {
            turns,
            heapSize: this.heapSize,
            isFinished: this.isFinished,
            winner: this.winner
        };
    }
    getRandomTurn() {
        return Math.floor(Math.random() * this.getMaxTokensToRemove()) + 1;
    }
}
exports.NimGame = NimGame;
