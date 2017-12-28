"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function alwaysMinStrategy() {
    return {
        getNextTurn(gameState) {
            return gameState.minTokensAllowedToRemove;
        }
    };
}
exports.alwaysMinStrategy = alwaysMinStrategy;
