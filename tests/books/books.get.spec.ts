import { BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';
import { EXISTING_BOOK_FIXTURE } from 'tests/fixtures/book.fixture';

const EXISTING_BOOK_ID = 1;

test.describe('GET /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  test('read all books', async () => {
    const response = await getRequest(booksUrl());
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse[]>(response);
    expect(responseBody.length).toBeGreaterThanOrEqual(1);
  });

  test('read book by id', async () => {
    const response = await getRequest(booksUrl(EXISTING_BOOK_ID));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    expect(responseBody).toMatchObject(EXISTING_BOOK_FIXTURE);
  });
});
