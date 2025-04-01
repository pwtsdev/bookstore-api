import { BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';

const SEARCH_TITLE = 'Patterns';
const SEARCH_AUTHOR = 'Richard';

test.describe('GET /books 2xx', { tag: ['@books', '@smoke', '@search'] }, () => {
  test('search by title', async () => {
    const queryParams = { title: SEARCH_TITLE };
    const response = await getRequest(booksUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse[]>(response);
    expect(responseBody.length).toBeGreaterThanOrEqual(1);

    responseBody.forEach((book) => {
      expect(book.title.toLowerCase()).toContain(SEARCH_TITLE.toLowerCase());
    });
  });

  test('search by author', async () => {
    const queryParams = { author: SEARCH_AUTHOR };
    const response = await getRequest(booksUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse[]>(response);
    expect(responseBody.length).toBeGreaterThanOrEqual(1);

    responseBody.forEach((book) => {
      const hasMatchingAuthor = book.authors.some(
        (author) =>
          author.firstName.toLowerCase().includes(SEARCH_AUTHOR.toLowerCase()) ||
          author.lastName.toLowerCase().includes(SEARCH_AUTHOR.toLowerCase()),
      );

      expect(hasMatchingAuthor).toBeTruthy();
    });
  });

  test('search by title and author', async () => {
    const queryParams = { title: SEARCH_TITLE, author: SEARCH_AUTHOR };
    const response = await getRequest(booksUrl(queryParams));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse[]>(response);
    expect(responseBody.length).toBeGreaterThanOrEqual(1);

    expect(responseBody.every((book) => book.title.toLowerCase().includes(SEARCH_TITLE.toLowerCase()))).toBeTruthy();

    responseBody.forEach((book) => {
      const hasMatchingAuthor = book.authors.some(
        (author) =>
          author.firstName.toLowerCase().includes(SEARCH_AUTHOR.toLowerCase()) ||
          author.lastName.toLowerCase().includes(SEARCH_AUTHOR.toLowerCase()),
      );
      expect(hasMatchingAuthor).toBeTruthy();
    });
  });
});
