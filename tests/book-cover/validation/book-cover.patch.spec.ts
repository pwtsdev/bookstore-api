import { BookResponse } from '@api-models/books/book.model';
import { HTTP_403_FORBIDDEN } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { getHeadersWithToken } from '@helpers/auth.helper';
import { getFormDataWithBookCover } from '@helpers/form.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksCoverUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';

test.describe('PATCH /books/:id/cover 4xx', { tag: ['@book-cover', '@validation'] }, () => {
  let existingBook: BookResponse;
  let bookId: number;
  let authorId: number;

  test.beforeEach('create test data', async () => {
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    authorId = existingBook.authors[0].id;
  });

  test.afterEach('delete test data', async () => {
    if (bookId) await deleteBookAPIStep(bookId);
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('update book cover without token', async () => {
    const formData = getFormDataWithBookCover();

    const response = await patchRequest(booksCoverUrl(bookId), formData);
    expect(statusCode(response)).toBe(HTTP_403_FORBIDDEN);
  });

  test.fixme('update book cover with invalid token', async () => {
    const formData = getFormDataWithBookCover();
    const headers = getHeadersWithToken('invalid-token');

    const response = await patchRequest(booksCoverUrl(bookId), formData, headers);
    expect(statusCode(response)).toBe(HTTP_403_FORBIDDEN);
  });
});
