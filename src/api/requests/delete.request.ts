import { APIResponse, request } from '@playwright/test';

export async function deleteRequest(endpoint: string): Promise<APIResponse> {
  const api = await request.newContext();
  return api.delete(endpoint);
}
