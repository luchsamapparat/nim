"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function abortIf(predicate, errorMessageFn) {
    return function (gameState) {
        if (predicate(gameState)) {
            throw new Error(errorMessageFn(gameState));
        }
        return gameState;
    };
}
exports.abortIf = abortIf;
function when(predicate, whenTrueFn) {
    return function (gameState) { return predicate(gameState) ? whenTrueFn(gameState) : gameState; };
}
exports.when = when;
