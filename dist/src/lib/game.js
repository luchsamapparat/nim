"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const predicates_1 = require("./predicates");
const state_1 = require("./state");
const strategy_1 = require("./strategy");
const util_1 = require("./util");
function playHumanTurn(tokensToRemove) {
    return playTurn(state_1.Player.Human, tokensToRemove);
}
exports.playHumanTurn = playHumanTurn;
function playMachineTurn() {
    return gameState => {
        return playTurn(state_1.Player.Machine, getNextTurn(gameState))(gameState);
    };
}
exports.playMachineTurn = playMachineTurn;
function getNextTurn(gameState) {
    return strategy_1.getStrategy(gameState.config.strategy)(gameState);
}
function playTurn(player, tokensToRemove) {
    return lodash_1.flow(util_1.abortIf(predicates_1.isInvalidTurn(tokensToRemove), ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => `You may remove between ${minTokensAllowedToRemove} and ${maxTokensAllowedToRemove} tokens from the heap. You tried to remove ${tokensToRemove} tokens.`), util_1.abortIf(predicates_1.isFinished(), ({ winner }) => `The game has already ended. ${winner} is the winner.`), state_1.updateStateWithTurn(player, tokensToRemove));
}
