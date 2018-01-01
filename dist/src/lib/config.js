"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var strategy_1 = require("./strategy");
exports.defaultGameConfig = {
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: state_1.Player.Human,
    strategy: strategy_1.StrategyName.RemainderStrategy
};
function getStateFromConfig() {
    return function (gameConfig) { return ({
        heapSize: gameConfig.heapSize,
        minTokensAllowedToRemove: gameConfig.minTokensToRemove,
        maxTokensAllowedToRemove: gameConfig.maxTokensToRemove,
        turns: [],
        winner: null,
        config: gameConfig
    }); };
}
exports.getStateFromConfig = getStateFromConfig;
function applyDefaultConfig() {
    return function (gameConfig) { return (__assign({}, exports.defaultGameConfig, gameConfig)); };
}
exports.applyDefaultConfig = applyDefaultConfig;
