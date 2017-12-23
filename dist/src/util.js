"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMaxTokensToRemove(heapSize) {
    return heapSize > 3 ? 3 : heapSize;
}
exports.getMaxTokensToRemove = getMaxTokensToRemove;
