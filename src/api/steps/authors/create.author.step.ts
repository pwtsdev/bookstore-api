import { AuthorPayload, AuthorResponse } from '@api-models/authors/author.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { expect } from '@playwright/test';
import { postRequest } from '@requests/post.request';

export async function createAuthorAPIStep(payload?: AuthorPayload): Promise<AuthorResponse> {
  if (!payload) {
    payload = getRandomAuthorPayload();
  }

  const response = await postRequest(authorsUrl(), payload);
  expect(statusCode(response)).toBe(HTTP_201_CREATED);

  const responseBody = await parseResponse<AuthorResponse>(response);
  expect(responseBody).toHaveProperty('id');
  expect(typeof responseBody.id).toBe('number');
  expect(responseBody.id).toBeTruthy();
  expect(responseBody).toMatchObject(payload);

  return responseBody;
}
