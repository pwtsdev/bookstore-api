import { AuthorResponse } from '@api-models/authors/authors.model';
import { HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND } from '@const/http.status.codes.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { deleteRequest } from '@requests/delete.request';
import { getRequest } from '@requests/get.request';
import { postRequest } from '@requests/post.request';

test.describe('DELETE /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  let authorId: number;

  test.beforeAll(async () => {
    const authorPayload = getRandomAuthorPayload();
    const response = await postRequest(authorsUrl(), authorPayload);
    const responseBody = await parseResponse<AuthorResponse>(response);
    authorId = responseBody.id;
  });

  test('delete existing author', async () => {
    await test.step('delete author', async () => {
      const response = await deleteRequest(authorsUrl(authorId));
      expect(statusCode(response)).toBe(HTTP_204_NO_CONTENT);
    });

    await test.step('read deleted author', async () => {
      const response = await getRequest(authorsUrl(authorId));
      expect(statusCode(response)).toBe(HTTP_404_NOT_FOUND);
    });
  });
});
