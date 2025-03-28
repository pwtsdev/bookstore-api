import { AuthorResponse } from '@api-models/authors/authors.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { expect } from '@playwright/test';
import { getRequest } from '@requests/get.request';

export async function readAuthorByIdAPIStep(authorId: number): Promise<AuthorResponse> {
  const response = await getRequest(authorsUrl(authorId));
  expect(statusCode(response)).toBe(HTTP_200_OK);

  return await parseResponse<AuthorResponse>(response);
}
