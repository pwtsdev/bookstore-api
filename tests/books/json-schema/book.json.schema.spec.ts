/* eslint-disable @typescript-eslint/naming-convention */
import { BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';
import Ajv from 'ajv';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';

const ajv = new Ajv();

const bookSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'Book',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    title: {
      type: 'string',
    },
    year: {
      type: 'integer',
    },
    price: {
      type: 'number',
    },
    coverId: {
      type: ['integer', 'null'],
    },
    available: {
      type: 'integer',
    },
    authors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
        },
        required: ['id', 'firstName', 'lastName'],
      },
    },
  },
  required: ['id', 'title', 'year', 'price', 'coverId', 'available', 'authors'],
};

test.describe('Validate JSON Schema', { tag: ['@books', '@smoke', '@schema'] }, () => {
  let book: BookResponse;
  let bookId: number;

  test.beforeEach('create test data', async () => {
    book = await createBookAPIStep();
    bookId = book.id;
  });

  test.afterEach(async () => {
    if (bookId) await deleteBookAPIStep(bookId);
  });

  test('book', async () => {
    const response = await getRequest(booksUrl(bookId));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    const validate = ajv.compile(bookSchema);
    const isValid = validate(responseBody);

    expect(isValid).toBeTruthy();
  });
});
