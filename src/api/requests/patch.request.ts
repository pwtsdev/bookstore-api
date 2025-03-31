import { APIPayload } from '@api-models/payload.model';
import { requestLogger, responseLogger } from '@helpers/logger.helper';
import { APIResponse, request } from '@playwright/test';

export async function patchRequest(endpoint: string, payload: APIPayload): Promise<APIResponse> {
  const api = await request.newContext();
  requestLogger('PATCH', endpoint, payload);

  const response = await api.patch(endpoint, { data: payload });
  await responseLogger(response);

  return response;
}
