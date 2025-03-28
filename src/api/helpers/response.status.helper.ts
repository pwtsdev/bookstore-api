import { APIResponse } from '@playwright/test';

export function statusCode(response: APIResponse): string {
  return String(response.status()) + ' ' + response.statusText();
}
