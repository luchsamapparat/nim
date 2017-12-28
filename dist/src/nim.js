"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const nim_model_1 = require("./nim.model");
function startGame(config) {
    return lodash_1.flow(getStateFromConfig(), when(isStartingPlayer(nim_model_1.Player.Machine), playMachineTurn()), toGame())(config);
}
exports.startGame = startGame;
function playRound(gameState, tokensToRemove) {
    return lodash_1.flow(playHumanTurn(tokensToRemove), when(lodash_1.negate(isFinished()), playMachineTurn()), toGame())(gameState);
}
function getPlayNextRound(gameState) {
    return isFinished()(gameState) ? null : lodash_1.partial(playRound, gameState);
}
function toGame() {
    return gameState => ({
        state: gameState,
        playNextRound: getPlayNextRound(gameState)
    });
}
function getStateFromConfig() {
    return (gameConfig) => ({
        heapSize: gameConfig.heapSize,
        minTokensAllowedToRemove: gameConfig.minTokensToRemove,
        maxTokensAllowedToRemove: gameConfig.maxTokensToRemove,
        turns: [],
        winner: null,
        config: gameConfig
    });
}
function playHumanTurn(tokensToRemove) {
    return playTurn(nim_model_1.Player.Human, tokensToRemove);
}
function playMachineTurn() {
    return gameState => {
        return playTurn(nim_model_1.Player.Machine, getNextTurn(gameState))(gameState);
    };
}
function getNextTurn(gameState) {
    return gameState.config.strategy.getNextTurn(gameState);
}
function playTurn(player, tokensToRemove) {
    return lodash_1.flow(abortIf(isInvalidTurn(tokensToRemove), ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => `You may remove between ${minTokensAllowedToRemove} and ${maxTokensAllowedToRemove} tokens from the heap.`), updateHeapSize(tokensToRemove), updateMaxTokensAllowedToRemove(), addTurn(player, tokensToRemove), when(isFinished(), updateWinner(player)));
}
function addTurn(player, tokensRemoved) {
    return gameState => (Object.assign({}, gameState, { turns: [
            ...gameState.turns,
            toTurn(player, tokensRemoved)
        ] }));
}
function toTurn(player, tokensRemoved) {
    return {
        player,
        tokensRemoved
    };
}
function updateHeapSize(tokensToRemove) {
    return gameState => (Object.assign({}, gameState, { heapSize: gameState.heapSize - tokensToRemove }));
}
function updateMaxTokensAllowedToRemove() {
    return gameState => (Object.assign({}, gameState, { maxTokensAllowedToRemove: Math.min(gameState.config.maxTokensToRemove, gameState.heapSize) }));
}
function updateWinner(winner) {
    return gameState => (Object.assign({}, gameState, { winner }));
}
function isInvalidTurn(tokensToRemove) {
    return ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => !lodash_1.inRange(tokensToRemove, minTokensAllowedToRemove, maxTokensAllowedToRemove + 1);
}
function isStartingPlayer(player) {
    return ({ config }) => (config.startingPlayer === player);
}
function isFinished() {
    return ({ heapSize }) => (heapSize === 0);
}
function abortIf(predicate, errorMessageFn) {
    return gameState => {
        if (predicate(gameState)) {
            throw new Error(errorMessageFn(gameState));
        }
        return gameState;
    };
}
function when(predicate, whenTrueFn) {
    return gameState => predicate(gameState) ? whenTrueFn(gameState) : gameState;
}
