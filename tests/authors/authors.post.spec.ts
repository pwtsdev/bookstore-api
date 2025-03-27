import test, { expect } from '@playwright/test';
import { getRandomAuthorPayload } from '../../src/datafactory/authors/author.data';
import { parseResponse } from '../../src/helpers/parse.response.helper';
import { authorsUrl } from '../../src/helpers/url.helper';
import { AuthorResponse } from '../../src/models/authors/authors.model';
import { postRequest } from '../../src/requests/post.request';

test.describe('POST /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  test('create new author', async () => {
    const authorPayload = getRandomAuthorPayload();

    const response = await postRequest(authorsUrl(), authorPayload);
    expect(response.status()).toBe(201);

    const responseBody = await parseResponse<AuthorResponse>(response);
    expect(responseBody.firstName).toBe(authorPayload.firstName);
    expect(responseBody.lastName).toBe(authorPayload.latName);
  });
});
