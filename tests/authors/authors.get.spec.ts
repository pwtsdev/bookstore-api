import test, { expect } from '@playwright/test';
import { parseResponse } from '../../src/helpers/parse.response.helper';
import { authorsUrl } from '../../src/helpers/url.helper';
import { AuthorResponse } from '../../src/models/authors/authors.model';
import { getRequest } from '../../src/requests/get.request';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';

test.describe('GET /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  test('read all authors', async () => {
    const response = await getRequest(authorsUrl());
    expect(response.status()).toBe(200);

    const authors = await parseResponse<AuthorResponse[]>(response);
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('read author by id', async () => {
    const response = await getRequest(authorsUrl(1));
    expect(response.status()).toBe(200);

    const author = await parseResponse<AuthorResponse>(response);
    expect(author.firstName).toBe(EXPECTED_FIRST_NAME);
    expect(author.lastName).toBe(EXPECTED_LAST_NAME);
  });
});
