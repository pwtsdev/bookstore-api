import { AuthorResponse } from '@api-models/authors/author.model';
import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { getRandomBookPayload } from '@datafactory/books/book.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';

test.describe('POST /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  let author: AuthorResponse;
  let authorId: number;
  let bookPayload: BookPayload;
  let bookId: number;

  test.beforeEach('create test data', async () => {
    author = await createAuthorAPIStep();
    authorId = author.id;

    bookPayload = getRandomBookPayload(authorId);
  });

  test.afterEach(async () => {
    if (bookId) await deleteBookAPIStep(bookId);
    if (authorId) await deleteAuthorAPIStep(authorId);
  });

  test('create a new book', async () => {
    const response = await postRequest(booksUrl(), bookPayload);
    expect(statusCode(response)).toBe(HTTP_201_CREATED);

    const responseBody = await parseResponse<BookResponse>(response);
    bookId = responseBody.id;

    expect(responseBody).toMatchObject({
      title: bookPayload.title,
      year: bookPayload.year,
      price: bookPayload.price,
      available: bookPayload.available,
      authors: [author],
    });
  });
});
