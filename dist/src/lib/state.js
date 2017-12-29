"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const predicates_1 = require("./predicates");
const util_1 = require("./util");
var Player;
(function (Player) {
    Player["Human"] = "Human";
    Player["Machine"] = "Machine";
})(Player = exports.Player || (exports.Player = {}));
function updateStateWithTurn(player, tokensToRemove) {
    return lodash_1.flow(updateHeapSize(tokensToRemove), updateTokensAllowedToRemove(), addTurn(player, tokensToRemove), util_1.when(predicates_1.isFinished(), updateWinner(getOpponent(player))));
}
exports.updateStateWithTurn = updateStateWithTurn;
function addTurn(player, tokensRemoved) {
    return gameState => (Object.assign({}, gameState, { turns: [
            ...gameState.turns,
            toTurn(player, tokensRemoved)
        ] }));
}
function updateHeapSize(tokensToRemove) {
    return gameState => (Object.assign({}, gameState, { heapSize: gameState.heapSize - tokensToRemove }));
}
function updateTokensAllowedToRemove() {
    return gameState => (Object.assign({}, gameState, { minTokensAllowedToRemove: Math.min(gameState.config.minTokensToRemove, gameState.heapSize), maxTokensAllowedToRemove: Math.min(gameState.config.maxTokensToRemove, gameState.heapSize) }));
}
function updateWinner(winner) {
    return gameState => (Object.assign({}, gameState, { winner }));
}
function getOpponent(player) {
    return (player === Player.Machine) ? Player.Human : Player.Machine;
}
function toTurn(player, tokensRemoved) {
    return {
        player,
        tokensRemoved
    };
}
