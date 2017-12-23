"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class RandomStrategy {
    getNextTurn(heapSize) {
        return Math.floor(Math.random() * util_1.getMaxTokensToRemove(heapSize)) + 1;
    }
}
exports.RandomStrategy = RandomStrategy;
class AlwaysOneStrategy {
    getNextTurn(heapSize) {
        return 1;
    }
}
exports.AlwaysOneStrategy = AlwaysOneStrategy;
