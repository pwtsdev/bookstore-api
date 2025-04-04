/* eslint-disable @typescript-eslint/naming-convention */
import { BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';
import Ajv from 'ajv';

const ajv = new Ajv();

const booksSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'Books',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      year: { type: 'integer' },
      price: { type: 'number' },
      coverUrl: { type: ['string', 'null'] },
      available: { type: 'integer' },
      authors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
          },
          required: ['firstName', 'lastName'],
        },
      },
    },
    required: ['id', 'title', 'year', 'price', 'coverUrl', 'available', 'authors'],
  },
};

test.describe('Validate JSON Schema', { tag: ['@books', '@smoke', '@schema'] }, () => {
  test('books', async () => {
    const response = await getRequest(booksUrl());
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse[]>(response);
    const validate = ajv.compile(booksSchema);
    const isValid = validate(responseBody);

    expect(isValid).toBeTruthy();
  });
});
