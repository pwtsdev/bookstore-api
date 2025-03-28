import { HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { deleteRequest } from '@requests/delete.request';
import { getRequest } from '@requests/get.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';

test.describe('DELETE /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  let authorId: number;

  test.beforeAll(async () => {
    const author = await createAuthorAPIStep();
    authorId = author.id;
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
