"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.mimicHumanStrategy = () => ({
    name: 'mimicHumanStrategy',
    getNextTurn({ turns, minTokensAllowedToRemove, maxTokensAllowedToRemove }) {
        if (lodash_1.isEmpty(turns)) {
            return minTokensAllowedToRemove;
        }
        return Math.min(lodash_1.last(turns).tokensRemoved, maxTokensAllowedToRemove);
    }
});
