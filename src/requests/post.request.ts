import { APIResponse, request } from '@playwright/test';
import { APIPayload } from '../models/payload.model';

export async function postRequest(endpoint: string, payload: APIPayload): Promise<APIResponse> {
  const api = await request.newContext();
  return api.post(endpoint, { data: payload });
}
