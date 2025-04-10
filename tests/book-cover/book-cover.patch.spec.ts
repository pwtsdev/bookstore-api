import { BookResponse } from '@api-models/books/book.model';
import { HTTP_202_ACCEPTED } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { getHeadersWithToken } from '@helpers/auth.helper';
import { getFormDataWithBookCover } from '@helpers/form.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksCoverUrl } from '@helpers/url.helper';
import { patchMultiFormRequest } from '@requests/patch.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';
import { createAdminTokenAPIStep } from 'src/api/steps/token/create.admin.token.step';

test.describe('PATCH /books/:id/cover 2xx', { tag: ['@book-cover', '@slow'] }, () => {
  let existingBook: BookResponse;
  let bookId: number;
  let authorId: number;
  let adminToken: string;

  test.beforeEach('create test data', async () => {
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    authorId = existingBook.authors[0].id;

    adminToken = await createAdminTokenAPIStep();
  });

  test.afterEach('delete test data', async () => {
    if (bookId) await deleteBookAPIStep(bookId);
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('update book cover', async () => {
    const formData = getFormDataWithBookCover();
    const headers = getHeadersWithToken(adminToken);

    const response = await patchMultiFormRequest(booksCoverUrl(bookId), formData, headers);

    expect(statusCode(response)).toBe(HTTP_202_ACCEPTED);
  });
});
