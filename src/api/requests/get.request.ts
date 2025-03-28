import { APIResponse, request } from '@playwright/test';

export async function getRequest(endpoint: string): Promise<APIResponse> {
  const api = await request.newContext();
  return api.get(endpoint);
}
