"use strict";
// Utility functions for Rocketship extension
// See docs/Architectural Documentation.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.notImplemented = notImplemented;
function notImplemented(msg = 'Not implemented') {
    throw new Error(msg);
}
