import { BookResponse } from '@api-models/books/book.model';
import { HTTP_204_NO_CONTENT } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { deleteRequest } from '@requests/delete.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';

test.describe('DELETE /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  let authorId: number;
  let book: BookResponse;
  let bookId: number;

  test.beforeEach('create test data', async () => {
    book = await createBookAPIStep();
    bookId = book.id;
    authorId = book.authors[0].id;
  });

  test.afterEach('delete test data', async () => {
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('delete a book', async () => {
    const response = await deleteRequest(booksUrl(bookId));
    expect(statusCode(response)).toBe(HTTP_204_NO_CONTENT);
  });
});
