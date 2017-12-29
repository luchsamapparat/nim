"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStateFromConfig() {
    return gameConfig => ({
        heapSize: gameConfig.heapSize,
        minTokensAllowedToRemove: gameConfig.minTokensToRemove,
        maxTokensAllowedToRemove: gameConfig.maxTokensToRemove,
        turns: [],
        winner: null,
        config: gameConfig
    });
}
exports.getStateFromConfig = getStateFromConfig;
