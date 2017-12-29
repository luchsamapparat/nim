"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function isInvalidTurn(tokensToRemove) {
    return ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => !lodash_1.inRange(tokensToRemove, minTokensAllowedToRemove, maxTokensAllowedToRemove + 1);
}
exports.isInvalidTurn = isInvalidTurn;
function isStartingPlayer(player) {
    return ({ config }) => (config.startingPlayer === player);
}
exports.isStartingPlayer = isStartingPlayer;
function isFinished() {
    return ({ heapSize }) => (heapSize === 0);
}
exports.isFinished = isFinished;
