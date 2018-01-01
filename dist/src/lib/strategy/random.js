"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.randomStrategy = function (_a) {
    var minTokensAllowedToRemove = _a.minTokensAllowedToRemove, maxTokensAllowedToRemove = _a.maxTokensAllowedToRemove;
    return lodash_1.random(minTokensAllowedToRemove, maxTokensAllowedToRemove);
};
