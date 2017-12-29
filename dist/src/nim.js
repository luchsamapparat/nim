"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const config_1 = require("./lib/config");
const game_1 = require("./lib/game");
const predicates_1 = require("./lib/predicates");
const state_1 = require("./lib/state");
const util_1 = require("./lib/util");
var state_2 = require("./lib/state");
exports.Player = state_2.Player;
var predicates_2 = require("./lib/predicates");
exports.isFinished = predicates_2.isFinished;
__export(require("./lib/strategy"));
exports.startGame = lodash_1.flow(config_1.getStateFromConfig(), util_1.when(predicates_1.isStartingPlayer(state_1.Player.Machine), game_1.playMachineTurn()));
exports.playRound = (tokensToRemove) => lodash_1.flow(game_1.playHumanTurn(tokensToRemove), util_1.when(lodash_1.negate(predicates_1.isFinished()), game_1.playMachineTurn()));
