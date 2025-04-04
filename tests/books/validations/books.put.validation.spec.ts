/* eslint-disable @typescript-eslint/no-unused-vars */
import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_400_BAD_REQUEST, HTTP_409_CONFLICT } from '@const/http.status.codes.const';
import {
  AUTHORS_INCORRECT_DATA,
  AVAILABLE_INCORRECT_DATA,
  CAN_NOT_FIND_AUTHOR_ERROR,
  OPERATION_CAN_NOT_BE_PERFORMED,
  PRICE_INCORRECT_DATA,
  TITLE_INCORRECT_DATA,
  YEAR_INCORRECT_DATA,
} from '@const/response.errors.const';
import { MAX_AVAILABLE, MIN_AVAILABLE, MIN_PRICE, MIN_YEAR, NON_EXISTING_ID } from '@const/validation.const';
import { getRandomBookOverridePayload, getRandomBookPayload } from '@datafactory/books/book.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { putRequest } from '@requests/put.request';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';

const invalidBookPayload = [
  {
    bookPayload: (_: number): BookPayload => getRandomBookPayload(),
    description: 'empty authors',
    errorMessage: AUTHORS_INCORRECT_DATA,
  },
  {
    bookPayload: (id: number): BookPayload => getRandomBookOverridePayload({ authors: [id], year: MIN_YEAR - 1 }),
    description: 'year before 1900',
    errorMessage: YEAR_INCORRECT_DATA,
  },
  // {
  //   bookPayload: (id: number): BookPayload => getRandomBookOverridePayload({ authors: [id], price: MAX_PRICE + 1 }),
  //   description: 'above max price',
  //   errorMessage: PRICE_INCORRECT_DATA,
  // },
  {
    bookPayload: (id: number): BookPayload => getRandomBookOverridePayload({ authors: [id], price: MIN_PRICE - 0.5 }),
    description: 'below min price',
    errorMessage: PRICE_INCORRECT_DATA,
  },
  {
    bookPayload: (id: number): BookPayload =>
      getRandomBookOverridePayload({ authors: [id], available: MAX_AVAILABLE + 1 }),
    description: 'above max available',
    errorMessage: AVAILABLE_INCORRECT_DATA,
  },
  {
    bookPayload: (id: number): BookPayload =>
      getRandomBookOverridePayload({ authors: [id], available: MIN_AVAILABLE - 0.5 }),
    description: 'below min available',
    errorMessage: AVAILABLE_INCORRECT_DATA,
  },
  {
    bookPayload: (_: number): BookPayload => getRandomBookOverridePayload({ authors: [NON_EXISTING_ID] }),
    description: 'author id does not exist',
    errorMessage: `${CAN_NOT_FIND_AUTHOR_ERROR} ${String(NON_EXISTING_ID)}`,
  },
];

test.describe('PUT /books 4xx', { tag: ['@books', '@validation', '@4xx'] }, () => {
  let existingBook: BookResponse;
  let bookId: number;
  let authorId: number;
  let randomBookPayload: BookPayload;

  test.beforeEach('create test data', async () => {
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    authorId = existingBook.authors[0].id;

    randomBookPayload = getRandomBookPayload(authorId);
  });

  test('empty json', async () => {
    const response = await putRequest(booksUrl(bookId), {} as BookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);

    const expectedMessages = [
      YEAR_INCORRECT_DATA,
      PRICE_INCORRECT_DATA,
      AVAILABLE_INCORRECT_DATA,
      AUTHORS_INCORRECT_DATA,
      TITLE_INCORRECT_DATA,
    ];

    expectedMessages.forEach((message) => {
      expect(responseBody.message).toContain(message);
    });
  });

  invalidBookPayload.forEach(({ bookPayload, description, errorMessage }) => {
    test(`book: ${description}`, async () => {
      const response = await putRequest(booksUrl(bookId), bookPayload(authorId));
      expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

      const responseBody = await parseResponse<ErrorResponse>(response);
      expect(responseBody.message).toContain(errorMessage);
    });
  });

  test('book with given title already exist', async () => {
    const bookOne = await createBookAPIStep();
    const bookTwo = await createBookAPIStep();

    randomBookPayload.title = bookOne.title;

    const response = await putRequest(booksUrl(bookTwo.id), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_409_CONFLICT);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(OPERATION_CAN_NOT_BE_PERFORMED);
  });
});
