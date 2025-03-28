import { AuthorResponse } from '@api-models/authors/authors.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';
const NON_EXISTING_NAME = 'XXXXXX';

test.describe('GET /authors 2xx', { tag: ['@authors', '@smoke', '@search'] }, () => {
  test('search by firstName', async () => {
    const queryParams = { firstName: EXPECTED_FIRST_NAME };

    const response = await getRequest(authorsUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('search by non existing firstName', async () => {
    const queryParams = { firstName: NON_EXISTING_NAME };

    const response = await getRequest(authorsUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBe(0);
  });

  test('search by lastName', async () => {
    const queryParams = { lastName: EXPECTED_LAST_NAME };

    const response = await getRequest(authorsUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('search by non existing lastName', async () => {
    const queryParams = { lastName: NON_EXISTING_NAME };

    const response = await getRequest(authorsUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBe(0);
  });

  test('search by firstName and lastName', async () => {
    const queryParams = { firstName: EXPECTED_FIRST_NAME, lastName: EXPECTED_LAST_NAME };

    const response = await getRequest(authorsUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('search by non existing firstName and non existing lastName', async () => {
    const queryParams = { firstName: NON_EXISTING_NAME, lastName: NON_EXISTING_NAME };

    const response = await getRequest(authorsUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBe(0);
  });
});
