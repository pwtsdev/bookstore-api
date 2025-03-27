import test, { expect } from '@playwright/test';
import { HTTP_201_CREATED } from '../../src/const/http.status.codes.const';
import { getRandomAuthorPayload } from '../../src/datafactory/authors/author.data';
import { parseResponse } from '../../src/helpers/parse.response.helper';
import { statusCode } from '../../src/helpers/response.status.helper';
import { authorsUrl } from '../../src/helpers/url.helper';
import { AuthorResponse } from '../../src/models/authors/authors.model';
import { postRequest } from '../../src/requests/post.request';

test.describe('POST /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  test('create new author', async () => {
    const authorPayload = getRandomAuthorPayload();

    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_201_CREATED);

    const responseBody = await parseResponse<AuthorResponse>(response);
    expect(responseBody.firstName).toBe(authorPayload.firstName);
    expect(responseBody.lastName).toBe(authorPayload.lastName);
  });
});
