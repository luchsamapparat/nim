"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const always_min_1 = require("./strategy/always-min");
const mimic_human_1 = require("./strategy/mimic-human");
const random_1 = require("./strategy/random");
const remainder_1 = require("./strategy/remainder");
__export(require("./strategy/always-min"));
__export(require("./strategy/mimic-human"));
__export(require("./strategy/random"));
__export(require("./strategy/remainder"));
function getStrategies() {
    return [
        always_min_1.alwaysMinStrategy,
        mimic_human_1.mimicHumanStrategy,
        random_1.randomStrategy,
        remainder_1.remainderStrategy
    ];
}
exports.getStrategies = getStrategies;
