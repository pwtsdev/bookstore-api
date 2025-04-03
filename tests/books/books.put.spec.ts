import { AuthorResponse } from '@api-models/authors/author.model';
import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { getRandomBookPayload } from '@datafactory/books/book.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomBookTitle } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { putRequest } from '@requests/put.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';

test.describe('PUT /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  let existingBook: BookResponse;
  let author: AuthorResponse;
  let bookPayload: BookPayload;

  test.beforeEach('create test data', async () => {
    // EXISTING BOOK
    existingBook = await createBookAPIStep();

    // BOOK PAYLOAD
    author = await createAuthorAPIStep();
    bookPayload = getRandomBookPayload(author.id);
    bookPayload.title = getRandomBookTitle();
    bookPayload.year = 2000;
    bookPayload.price = 9.99;
    bookPayload.available = 500;
  });

  test('update existing book', async () => {
    const response = await putRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    expect(responseBody).toMatchObject({
      id: existingBook.id,
      title: bookPayload.title,
      year: bookPayload.year,
      price: bookPayload.price,
      available: bookPayload.available,
      authors: [author],
    });
  });
});
