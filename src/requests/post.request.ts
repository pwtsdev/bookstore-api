/* eslint-disable @typescript-eslint/no-empty-object-type */
import { APIResponse, request } from '@playwright/test';

export async function postRequest(endpoint: string, payload: {}): Promise<APIResponse> {
  const api = await request.newContext();
  return api.post(endpoint, { data: payload });
}
