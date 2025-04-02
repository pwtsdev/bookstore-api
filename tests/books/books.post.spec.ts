import { AuthorResponse } from '@api-models/authors/author.model';
import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomBookTitle } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';

test.describe('POST /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  let author: AuthorResponse;
  let authorId: number;
  let bookPayload: BookPayload;

  test.beforeEach('create test data', async () => {
    author = await createAuthorAPIStep();
    authorId = author.id;

    bookPayload = {
      title: getRandomBookTitle(),
      authors: [authorId],
      year: 2022,
      price: 49.99,
      available: 100,
    };
  });

  // test.afterEach(async () => {
  //   if (authorId) await deleteAuthorAPIStep(authorId);
  // });

  test('create a new book', async () => {
    const response = await postRequest(booksUrl(), bookPayload);
    expect(statusCode(response)).toBe(HTTP_201_CREATED);

    const responseBody = await parseResponse<BookResponse>(response);
    expect(responseBody).toMatchObject({
      title: bookPayload.title,
      year: bookPayload.year,
      price: bookPayload.price,
      available: bookPayload.available,
      authors: [author],
    });
  });
});
