import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT } from '@const/http.status.codes.const';
import { OPERATION_CAN_NOT_BE_PERFORMED, TITLE_INCORRECT_DATA } from '@const/response.errors.const';
import { NON_EXISTING_ID } from '@const/validation.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';

test.describe('PATCH /books 4xx', { tag: ['@books', '@validation', '@4xx'] }, () => {
  let existingBook: BookResponse;
  let bookId: number;
  let authorId: number;

  test.beforeEach('create test data', async () => {
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    authorId = existingBook.authors[0].id;
  });

  test.afterEach(async () => {
    if (bookId) await deleteBookAPIStep(bookId);
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('empty title', async () => {
    const bookPayload = { title: '' } as BookPayload;

    const response = await patchRequest(booksUrl(bookId), bookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(TITLE_INCORRECT_DATA);
  });

  test('existing title', async () => {
    const bookOne = await createBookAPIStep();
    const bookTwo = await createBookAPIStep();

    const bookPayload = { title: bookOne.title } as BookPayload;

    const response = await patchRequest(booksUrl(bookTwo.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_409_CONFLICT);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(OPERATION_CAN_NOT_BE_PERFORMED);
  });

  test('non existing book', async () => {
    const bookPayload = { title: '' } as BookPayload;

    const response = await patchRequest(booksUrl(NON_EXISTING_ID), bookPayload);
    expect(statusCode(response)).toBe(HTTP_404_NOT_FOUND);
  });
});
