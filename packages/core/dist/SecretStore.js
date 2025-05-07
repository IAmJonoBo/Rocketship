/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */
const secrets = {};
export async function getSecret(key) {
    // TODO: Add telemetry for secret access
    return secrets[key];
}
export async function setSecret(key, value) {
    secrets[key] = value;
}
