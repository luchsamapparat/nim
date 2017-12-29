"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function abortIf(predicate, errorMessageFn) {
    return gameState => {
        if (predicate(gameState)) {
            throw new Error(errorMessageFn(gameState));
        }
        return gameState;
    };
}
exports.abortIf = abortIf;
function when(predicate, whenTrueFn) {
    return gameState => predicate(gameState) ? whenTrueFn(gameState) : gameState;
}
exports.when = when;
