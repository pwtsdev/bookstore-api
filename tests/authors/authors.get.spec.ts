import { AuthorResponse } from '@api-models/authors/authors.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';

test.describe('GET /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  test('read all authors', async () => {
    const response = await getRequest(authorsUrl());
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('read author by id', async () => {
    const response = await getRequest(authorsUrl(1));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const author = await parseResponse<AuthorResponse>(response);
    expect(author.firstName).toBe(EXPECTED_FIRST_NAME);
    expect(author.lastName).toBe(EXPECTED_LAST_NAME);
  });
});
