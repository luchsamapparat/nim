"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function randomStrategy() {
    return {
        getNextTurn(gameState) {
            return lodash_1.random(gameState.minTokensAllowedToRemove, gameState.maxTokensAllowedToRemove);
        }
    };
}
exports.randomStrategy = randomStrategy;
