"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function mimicHumanStrategy() {
    return {
        getNextTurn(gameState) {
            if (lodash_1.isEmpty(gameState.turns)) {
                return gameState.minTokensAllowedToRemove;
            }
            return Math.min(lodash_1.last(gameState.turns).tokensRemoved, gameState.maxTokensAllowedToRemove);
        }
    };
}
exports.mimicHumanStrategy = mimicHumanStrategy;
