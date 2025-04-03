import { ErrorResponse } from '@api-models/response.error.model';
import { API_BOOKS } from '@const/endpoints.const';
import { BAD_REQUEST } from '@const/http.messages.const';
import { HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } from '@const/http.status.codes.const';
import { INVALID_TYPE_ID, NON_EXISTING_ID } from '@const/validation.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';

test.describe('GET /books 4xx', { tag: ['@books', '@validation', '@4xx'] }, () => {
  test('read book by non existing id', async () => {
    const response = await getRequest(booksUrl(NON_EXISTING_ID));
    expect(statusCode(response)).toBe(HTTP_404_NOT_FOUND);
  });

  test('read book by invalid format id', async () => {
    const response = await getRequest(`${API_BOOKS}/${INVALID_TYPE_ID}`);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
  });
});
