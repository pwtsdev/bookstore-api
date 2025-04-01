/* eslint-disable @typescript-eslint/naming-convention */
import { AuthorResponse } from '@api-models/authors/authors.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { MAX_LENGTH, MIN_LENGTH } from '@const/validation.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';
import Ajv from 'ajv';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';

const ajv = new Ajv();

const authorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    firstName: {
      type: 'string',
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
    },
    lastName: {
      type: 'string',
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
    },
  },
  required: ['id', 'firstName', 'lastName'],
  additionalProperties: false,
};

test.describe('Validate JSON Schema', { tag: ['@authors', '@smoke', '@schema'] }, () => {
  let authorId: number;
  let author: AuthorResponse;

  test.beforeEach('create test data', async () => {
    author = await createAuthorAPIStep();
    authorId = author.id;
  });

  test.afterEach(async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('author', async () => {
    const response = await getRequest(authorsUrl(authorId));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<AuthorResponse>(response);
    const validate = ajv.compile(authorSchema);
    const isValid = validate(responseBody);

    expect(isValid).toBeTruthy();
  });
});
