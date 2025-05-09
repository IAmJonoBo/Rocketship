import fs from 'fs';
import path from 'path';
import { TelemetryService } from '../services/TelemetryService.js';

const telemetry = new TelemetryService();

export function loadTemplate(name: string): string {
  const tplPath = path.resolve(__dirname, `${name}.tpl`);
  const content = fs.readFileSync(tplPath, 'utf-8');
  const gitSHA = process.env.GIT_SHA || 'unknown';
  telemetry.trackEvent('prompt.loaded', { templateName: name, gitSHA });
  return content
    .replace('{{gitSHA}}', gitSHA)
    .replace('{{now}}', new Date().toISOString());
}