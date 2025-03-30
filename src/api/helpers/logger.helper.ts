/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIResponse } from '@playwright/test';
import chalk from 'chalk';
import { parseResponse } from './parse.response.helper';

const isLoggerEnabled = process.env.LOGGER === 'true';

export function requestLogger(
  method: string,
  url: string,
  payload?: Record<string, any>,
  headers?: Record<string, string>,
): void {
  if (!isLoggerEnabled) return;

  console.log(chalk.bold.yellow(`🔍 [LOGGER] ${method.toUpperCase()} Request`));
  console.log(chalk.cyan('URL:'), chalk.white(url));
  if (headers) console.log(chalk.cyan('Headers:'), chalk.gray(JSON.stringify(headers, null, 2)));
  if (payload) console.log(chalk.cyan('Payload:'), chalk.white(JSON.stringify(payload, null, 2)));
}

export async function responseLogger(response: APIResponse): Promise<void> {
  if (!isLoggerEnabled) return;

  const statusColor = response.status() >= 400 ? chalk.red : response.status() >= 300 ? chalk.yellow : chalk.green;

  console.log(chalk.bold.yellow('🔍 [LOGGER] Response'));
  console.log(chalk.cyan('Status:'), statusColor(response.status()));
  console.log(chalk.cyan('Headers:'), chalk.gray(JSON.stringify(response.headers(), null, 2)));

  try {
    const contentType = response.headers()['content-type'] ?? '';
    if (contentType.includes('application/json')) {
      const json = await parseResponse(response);
      console.log(chalk.cyan('JSON Body:'), chalk.white(JSON.stringify(json, null, 2)));
    } else {
      const text = await response.text();
      console.log(chalk.cyan('Text Body:'), chalk.white(text));
    }
  } catch (e) {
    console.log(chalk.red('⚠️ Could not parse response body:'), e);
  }
}
