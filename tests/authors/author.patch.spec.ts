import { AuthorPayload, AuthorResponse } from '@api-models/authors/author.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomFirstName, getRandomLastName } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { readAuthorByIdAPIStep } from 'src/api/steps/authors/read.author.step';

test.describe('PATCH /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  let authorId: number;
  let updatedAuthorPayload: AuthorPayload;
  let author: AuthorResponse;

  test.beforeEach(async () => {
    author = await createAuthorAPIStep();
    authorId = author.id;
  });

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('partial update firstName', async () => {
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

  test('partial update lastName', async () => {
    await test.step('only lastName', async () => {
      const randomLastName = getRandomLastName();
      updatedAuthorPayload = { lastName: randomLastName } as AuthorPayload;
      const response = await patchRequest(authorsUrl(authorId), updatedAuthorPayload);
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const responseBody = await parseResponse<AuthorPayload>(response);
      expect(responseBody.lastName).toBe(updatedAuthorPayload.lastName);
    });

    await test.step('verify author updated', async () => {
      const response = await readAuthorByIdAPIStep(authorId);
      expect(response.lastName).toBe(updatedAuthorPayload.lastName);
    });
  });

  test('partial update firstName and lastName', async () => {
    await test.step('firstName and lastName', async () => {
      const randomFirstName = getRandomFirstName();
      const randomLastName = getRandomLastName();
      updatedAuthorPayload = { firstName: randomFirstName, lastName: randomLastName };
      const response = await patchRequest(authorsUrl(authorId), updatedAuthorPayload);
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const responseBody = await parseResponse<AuthorPayload>(response);
      expect(responseBody.firstName).toBe(updatedAuthorPayload.firstName);
      expect(responseBody.lastName).toBe(updatedAuthorPayload.lastName);
    });

    await test.step('verify author updated', async () => {
      const response = await readAuthorByIdAPIStep(authorId);
      expect(response.firstName).toBe(updatedAuthorPayload.firstName);
      expect(response.lastName).toBe(updatedAuthorPayload.lastName);
    });
  });

  test('partial update empty json', async () => {
    await test.step('empty json', async () => {
      updatedAuthorPayload = {} as AuthorPayload;
      const response = await patchRequest(authorsUrl(authorId), updatedAuthorPayload);
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const responseBody = await parseResponse<AuthorPayload>(response);
      expect(responseBody.firstName).toBe(author.firstName);
      expect(responseBody.lastName).toBe(author.lastName);
    });

    await test.step('verify author updated', async () => {
      const response = await readAuthorByIdAPIStep(authorId);
      expect(response.firstName).toBe(author.firstName);
      expect(response.lastName).toBe(author.lastName);
    });
  });
});
