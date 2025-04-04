/* eslint-disable @typescript-eslint/naming-convention */
import { AuthorResponse } from '@api-models/authors/author.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { MAX_LENGTH, MIN_LENGTH } from '@const/validation.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';
import Ajv from 'ajv';

const ajv = new Ajv();

const authorsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
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
  },
};

test.describe('Validate JSON Schema', { tag: ['@authors', '@smoke', '@schema'] }, () => {
  test('authors', async () => {
    const response = await getRequest(authorsUrl());
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<AuthorResponse[]>(response);
    const validate = ajv.compile(authorsSchema);
    const isValid = validate(responseBody);

    expect(isValid).toBeTruthy();
  });
});
