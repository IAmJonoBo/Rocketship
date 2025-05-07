/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */

const secrets: Record<string, string> = {};

export async function getSecret(key: string): Promise<string | undefined> {
  // TODO: Add telemetry for secret access
  return secrets[key];
}

export async function setSecret(key: string, value: string): Promise<void> {
  secrets[key] = value;
}
