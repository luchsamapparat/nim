"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alwaysMinStrategy = () => ({
    name: 'alwaysMinStrategy',
    getNextTurn({ minTokensAllowedToRemove }) {
        return minTokensAllowedToRemove;
    }
});
