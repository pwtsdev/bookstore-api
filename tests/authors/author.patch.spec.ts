import { AuthorPayload } from '@api-models/authors/authors.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomFirstName } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { readAuthorByIdAPIStep } from 'src/api/steps/authors/read.author.step';

test.describe('PATCH /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  let authorId: number;
  let updatedAuthorPayload: AuthorPayload;

  test.beforeEach(async () => {
    const author = await createAuthorAPIStep();
    authorId = author.id;
  });

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('partial update existing author', async () => {
    await test.step('only firstName', async () => {
      const randomFirstName = getRandomFirstName();
      updatedAuthorPayload = { firstName: randomFirstName } as AuthorPayload;
      const response = await patchRequest(authorsUrl(authorId), updatedAuthorPayload);
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const responseBody = await parseResponse<AuthorPayload>(response);
      expect(responseBody.firstName).toBe(updatedAuthorPayload.firstName);
    });

    await test.step('verify author updated', async () => {
      const response = await readAuthorByIdAPIStep(authorId);
      expect(response.firstName).toBe(updatedAuthorPayload.firstName);
    });
  });
});
