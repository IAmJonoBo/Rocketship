// Utility functions for Rocketship extension
// See docs/Architectural Documentation.md

export function notImplemented(msg: string = 'Not implemented'): never {
  throw new Error(msg);
}