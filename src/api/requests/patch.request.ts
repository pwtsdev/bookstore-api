import { APIPayload } from '@api-models/payload.model';
import { requestLogger, responseLogger } from '@helpers/logger.helper';
import { APIResponse, request } from '@playwright/test';

export async function patchRequest(
  endpoint: string,
  payload: APIPayload | FormData,
  headers: Record<string, string> = {},
): Promise<APIResponse> {
  const api = await request.newContext();
  const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;

  requestLogger('PATCH', endpoint, isFormData ? undefined : payload, headers);

  const response = await api.patch(endpoint, {
    ...(isFormData ? { multipart: payload } : { data: payload }),
    headers: { ...headers },
  });
  await responseLogger(response);

  return response;
}
