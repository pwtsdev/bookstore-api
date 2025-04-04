import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { YEAR_INCORRECT_DATA } from '@const/response.errors.const';
import { MIN_YEAR } from '@const/validation.const';
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

  test('empty year', async () => {
    const bookPayload = { year: '' } as unknown as BookPayload;

    const response = await patchRequest(booksUrl(bookId), bookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(YEAR_INCORRECT_DATA);
  });

  test('year before 1900', async () => {
    const bookPayload = { year: MIN_YEAR - 1 } as BookPayload;

    const response = await patchRequest(booksUrl(bookId), bookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(YEAR_INCORRECT_DATA);
  });
});
