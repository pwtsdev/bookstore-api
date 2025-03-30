import { requestLogger, responseLogger } from '@helpers/logger.helper';
import { APIResponse, request } from '@playwright/test';

export async function deleteRequest(endpoint: string): Promise<APIResponse> {
  const api = await request.newContext();
  requestLogger('DELETE', endpoint);

  const response = await api.delete(endpoint);
  await responseLogger(response);

  return response;
}
