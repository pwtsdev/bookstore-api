import { AuthorPayload } from '@api-models/authors/authors.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { putRequest } from '@requests/put.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { readAuthorByIdAPIStep } from 'src/api/steps/authors/read.author.step';

test.describe('PUT /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  let authorId: number;
  let updatedAuthorPayload: AuthorPayload;

  test.beforeEach(async () => {
    const author = await createAuthorAPIStep();
    authorId = author.id;
  });

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('update existing author', async () => {
    await test.step('update author', async () => {
      updatedAuthorPayload = getRandomAuthorPayload();
      const response = await putRequest(authorsUrl(authorId), updatedAuthorPayload);
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const responseBody = await parseResponse<AuthorPayload>(response);
      expect(responseBody).toMatchObject(updatedAuthorPayload);
    });

    await test.step('verify author updated', async () => {
      const response = await readAuthorByIdAPIStep(authorId);
      expect(response).toMatchObject(updatedAuthorPayload);
    });
  });
});
