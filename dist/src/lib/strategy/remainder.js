"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remainderStrategy = function (_a) {
    var heapSize = _a.heapSize, minTokensAllowedToRemove = _a.minTokensAllowedToRemove, maxTokensAllowedToRemove = _a.maxTokensAllowedToRemove;
    var tokensToRemove = 0;
    // build groups of (min + maxTokensToRemove) and determine the number
    // of remaining tokens
    var remainder = heapSize % (minTokensAllowedToRemove + maxTokensAllowedToRemove);
    // to reduce the number of remaining tokens to one, remove all of the remaining
    // tokens but the minimum allowed number of tokens to remove
    if (remainder > 0) {
        tokensToRemove = remainder - minTokensAllowedToRemove;
    }
    // in case there are no remaining tokens, remove enough tokens to leave
    // one remaining token besides the groups of (min + maxTokensToRemove)
    if (remainder === 0) {
        tokensToRemove = maxTokensAllowedToRemove;
    }
    // when the current heap size already consists of groups of (min + maxTokensToRemove)
    // and minTokensToRemove additional remaining tokens, the amount of tokens to remove
    // would be 0; in this case remove the minimum allowed number of tokens
    return Math.max(tokensToRemove, minTokensAllowedToRemove);
};
