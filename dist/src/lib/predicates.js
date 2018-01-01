"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function isInvalidTurn(tokensToRemove) {
    return function (_a) {
        var minTokensAllowedToRemove = _a.minTokensAllowedToRemove, maxTokensAllowedToRemove = _a.maxTokensAllowedToRemove;
        return !lodash_1.inRange(tokensToRemove, minTokensAllowedToRemove, maxTokensAllowedToRemove + 1);
    };
}
exports.isInvalidTurn = isInvalidTurn;
function isStartingPlayer(player) {
    return function (_a) {
        var config = _a.config;
        return (config.startingPlayer === player);
    };
}
exports.isStartingPlayer = isStartingPlayer;
function isFinished() {
    return function (_a) {
        var heapSize = _a.heapSize;
        return (heapSize === 0);
    };
}
exports.isFinished = isFinished;
