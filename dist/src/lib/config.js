"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const strategy_1 = require("./strategy");
exports.defaultGameConfig = {
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: state_1.Player.Human,
    strategy: strategy_1.StrategyName.RemainderStrategy
};
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
function applyDefaultConfig() {
    return gameConfig => (Object.assign({}, exports.defaultGameConfig, gameConfig));
}
exports.applyDefaultConfig = applyDefaultConfig;
