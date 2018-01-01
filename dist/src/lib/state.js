"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var predicates_1 = require("./predicates");
var util_1 = require("./util");
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
    return function (gameState) { return (__assign({}, gameState, { turns: gameState.turns.concat([
            toTurn(player, tokensRemoved)
        ]) })); };
}
function updateHeapSize(tokensToRemove) {
    return function (gameState) { return (__assign({}, gameState, { heapSize: gameState.heapSize - tokensToRemove })); };
}
function updateTokensAllowedToRemove() {
    return function (gameState) { return (__assign({}, gameState, { minTokensAllowedToRemove: Math.min(gameState.config.minTokensToRemove, gameState.heapSize), maxTokensAllowedToRemove: Math.min(gameState.config.maxTokensToRemove, gameState.heapSize) })); };
}
function updateWinner(winner) {
    return function (gameState) { return (__assign({}, gameState, { winner: winner })); };
}
function getOpponent(player) {
    return (player === Player.Machine) ? Player.Human : Player.Machine;
}
function toTurn(player, tokensRemoved) {
    return {
        player: player,
        tokensRemoved: tokensRemoved
    };
}
