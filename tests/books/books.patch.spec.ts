import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomBookTitle } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';

test.describe('PATCH /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  let existingBook: BookResponse;
  let randomBookTitle: string;
  let bookId: number;
  let authorId: number;

  test.beforeEach('create test data', async () => {
    // EXISTING BOOK
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    authorId = existingBook.authors[0].id;

    randomBookTitle = getRandomBookTitle();
  });

  test.afterEach(async () => {
    if (bookId) await deleteBookAPIStep(bookId);
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('update book title', async () => {
    const bookPayload = { title: randomBookTitle } as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    existingBook.title = randomBookTitle;
    expect(responseBody).toMatchObject(existingBook);
  });

  test('update with empty json', async () => {
    const bookPayload = {} as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    expect(responseBody).toMatchObject(existingBook);
  });
});
