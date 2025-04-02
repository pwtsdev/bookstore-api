import { HTTP_204_NO_CONTENT } from '@const/http.status.codes.const';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { APIResponse, expect } from '@playwright/test';
import { deleteRequest } from '@requests/delete.request';

export async function deleteBookAPIStep(id: number): Promise<APIResponse> {
  const response = await deleteRequest(booksUrl(id));
  expect(statusCode(response)).toBe(HTTP_204_NO_CONTENT);

  return response;
}
