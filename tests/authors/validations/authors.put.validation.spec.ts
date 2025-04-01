import { AuthorPayload } from '@api-models/authors/authors.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { BAD_REQUEST } from '@const/http.messages.const';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { putRequest } from '@requests/put.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { readAuthorByIdAPIStep } from 'src/api/steps/authors/read.author.step';
import { invalidAuthorPayload } from 'tests/test-data/authors/invalid-author.testdata';

test.describe('PUT /authors 4xx', { tag: ['@authors', '@validation', '@4xx'] }, () => {
  let existingAuthorPayload: AuthorPayload;
  let authorId: number;

  test.beforeEach(async () => {
    existingAuthorPayload = getRandomAuthorPayload();

    const author = await createAuthorAPIStep(existingAuthorPayload);
    authorId = author.id;
  });

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  invalidAuthorPayload.forEach(({ authorPayload, message, description }) => {
    test(`author: ${description}`, async () => {
      await test.step('update an existing author', async ({}) => {
        const response = await putRequest(authorsUrl(authorId), authorPayload);
        expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

        const responseBody = await parseResponse<ErrorResponse>(response);
        expect(responseBody.error).toBe(BAD_REQUEST);
        expect(responseBody.message).toContain(message);
      });

      await test.step('read updated author', async ({}) => {
        const author = await readAuthorByIdAPIStep(authorId);
        expect(author).toMatchObject(existingAuthorPayload);
      });
    });
  });
});
