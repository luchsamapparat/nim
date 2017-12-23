"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
function getStrategies() {
    return [
        RandomStrategy,
        AlwaysOneStrategy,
        MimicHumanStrategy,
        RemainderStrategy
    ];
}
exports.getStrategies = getStrategies;
class RandomStrategy {
    getNextTurn(heapSize, previousTurn) {
        return Math.floor(Math.random() * util_1.getMaxTokensToRemove(heapSize)) + 1;
    }
}
exports.RandomStrategy = RandomStrategy;
class AlwaysOneStrategy {
    getNextTurn(heapSize, previousTurn) {
        return 1;
    }
}
exports.AlwaysOneStrategy = AlwaysOneStrategy;
class MimicHumanStrategy {
    getNextTurn(heapSize, previousTurn) {
        let tokensToRemove = 1;
        if (!isUndefined(previousTurn)) {
            tokensToRemove = Math.min(previousTurn.tokensRemoved, util_1.getMaxTokensToRemove(heapSize));
        }
        return tokensToRemove;
    }
}
exports.MimicHumanStrategy = MimicHumanStrategy;
class RemainderStrategy {
    getNextTurn(heapSize, previousTurn) {
        const remainderAfterDivisionBy4 = heapSize % 4;
        switch (remainderAfterDivisionBy4) {
            case 0:
                return 3;
            case 1:
                return 1;
            case 2:
                return 1;
            case 3:
                return 2;
        }
    }
}
exports.RemainderStrategy = RemainderStrategy;
function isUndefined(previousTurn) {
    return (typeof previousTurn === 'undefined');
}
