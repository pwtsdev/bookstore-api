import { AuthorResponse } from '@api-models/authors/authors.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';

test.describe('POST /authors 2xx', { tag: ['@authors', '@smoke', '@wip'] }, () => {
  let authorId: number;

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('create new author', async () => {
    const authorPayload = getRandomAuthorPayload();

    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_201_CREATED);

    const responseBody = await parseResponse<AuthorResponse>(response);
    authorId = responseBody.id;
    expect(responseBody.firstName).toBe(authorPayload.firstName);
    expect(responseBody.lastName).toBe(authorPayload.lastName);
  });
});
