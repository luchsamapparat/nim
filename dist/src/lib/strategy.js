"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const util_1 = require("util");
const always_min_1 = require("./strategy/always-min");
const mimic_human_1 = require("./strategy/mimic-human");
const random_1 = require("./strategy/random");
const remainder_1 = require("./strategy/remainder");
__export(require("./strategy/always-min"));
__export(require("./strategy/mimic-human"));
__export(require("./strategy/random"));
__export(require("./strategy/remainder"));
var StrategyName;
(function (StrategyName) {
    StrategyName["AlwaysMinStrategy"] = "alwaysMinStrategy";
    StrategyName["MimicHumanStrategy"] = "mimicHumanStrategy";
    StrategyName["RandomStrategy"] = "randomStrategy";
    StrategyName["RemainderStrategy"] = "remainderStrategy";
})(StrategyName = exports.StrategyName || (exports.StrategyName = {}));
exports.strategies = {
    alwaysMinStrategy: always_min_1.alwaysMinStrategy,
    mimicHumanStrategy: mimic_human_1.mimicHumanStrategy,
    randomStrategy: random_1.randomStrategy,
    remainderStrategy: remainder_1.remainderStrategy
};
function getStrategy(strategyName) {
    const strategy = lodash_1.find(exports.strategies, (fn, name) => name === strategyName);
    if (util_1.isUndefined(strategy)) {
        throw new Error(`${strategyName} is not a valid Strategy.`);
    }
    return strategy;
}
exports.getStrategy = getStrategy;
