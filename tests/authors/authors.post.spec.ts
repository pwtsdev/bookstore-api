import { AuthorResponse } from '@api-models/authors/author.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { MAX_LENGTH, MIN_LENGTH } from '@const/validation.const';
import { getRandomAuthorPayload } from '@datafactory/authors/author.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';

const validAuthorPayload = [
  {
    authorPayload: getRandomAuthorPayload(),
    description: 'valid data',
  },
  {
    authorPayload: { firstName: 'a'.repeat(MIN_LENGTH), lastName: 'a'.repeat(MIN_LENGTH) },
    description: 'min length values',
  },
  {
    authorPayload: { firstName: 'a'.repeat(MAX_LENGTH), lastName: 'a'.repeat(MAX_LENGTH) },
    description: 'max length values',
  },
];

test.describe('POST /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  let authorId: number;

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  validAuthorPayload.forEach(({ authorPayload, description }) => {
    test(`author: ${description}`, async () => {
      const response = await postRequest(authorsUrl(), authorPayload);
      expect(statusCode(response)).toBe(HTTP_201_CREATED);

      const responseBody = await parseResponse<AuthorResponse>(response);
      authorId = responseBody.id;
      expect(responseBody.firstName).toBe(authorPayload.firstName);
      expect(responseBody.lastName).toBe(authorPayload.lastName);
    });
  });
});
