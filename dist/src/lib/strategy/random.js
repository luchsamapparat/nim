"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.randomStrategy = ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => {
    return lodash_1.random(minTokensAllowedToRemove, maxTokensAllowedToRemove);
};
