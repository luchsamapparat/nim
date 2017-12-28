"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src/nim"));
__export(require("./src/nim.model"));
__export(require("./src/strategy"));
__export(require("./src/strategy/always-min"));
__export(require("./src/strategy/mimic-human"));
__export(require("./src/strategy/random"));
__export(require("./src/strategy/remainder"));
