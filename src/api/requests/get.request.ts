import { requestLogger, responseLogger } from '@helpers/logger.helper';
import { APIResponse, request } from '@playwright/test';

export async function getRequest(endpoint: string): Promise<APIResponse> {
  const api = await request.newContext();
  requestLogger('GET', endpoint);

  const response = await api.get(endpoint);
  await responseLogger(response);

  return response;
}
