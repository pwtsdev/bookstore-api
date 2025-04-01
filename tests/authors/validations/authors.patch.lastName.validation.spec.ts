import { AuthorPayload } from '@api-models/authors/authors.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { BAD_REQUEST } from '@const/http.messages.const';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { LAST_NAME_INCORRECT_DATA } from '@const/response.errors.const';
import { MAX_LENGTH, MIN_LENGTH } from '@const/validation.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { readAuthorByIdAPIStep } from 'src/api/steps/authors/read.author.step';

const invalidLastName = [
  {
    authorPayload: { lastName: 'a'.repeat(MIN_LENGTH - 1) } as AuthorPayload,
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName is less than 3 characters',
  },
  {
    authorPayload: { lastName: 'a'.repeat(MAX_LENGTH + 1) } as AuthorPayload,
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName is more than 128 characters',
  },
  {
    authorPayload: { lastName: 123 } as unknown as AuthorPayload,
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName invalid data type',
  },
];

test.describe('PATCH /authors 4xx', { tag: ['@authors', '@validation', '@4xx'] }, () => {
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

  invalidLastName.forEach(({ authorPayload, message, description }) => {
    test(`author: ${description}`, async () => {
      await test.step('update an existing author', async ({}) => {
        const response = await patchRequest(authorsUrl(authorId), authorPayload);
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
