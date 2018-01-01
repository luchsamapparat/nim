"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.mimicHumanStrategy = function (_a) {
    var turns = _a.turns, minTokensAllowedToRemove = _a.minTokensAllowedToRemove, maxTokensAllowedToRemove = _a.maxTokensAllowedToRemove;
    if (lodash_1.isEmpty(turns)) {
        return minTokensAllowedToRemove;
    }
    return Math.min(lodash_1.last(turns).tokensRemoved, maxTokensAllowedToRemove);
};
