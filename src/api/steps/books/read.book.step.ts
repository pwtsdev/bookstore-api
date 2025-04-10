import { BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { expect } from '@playwright/test';
import { getRequest } from '@requests/get.request';

export async function readBookByIdAPIStep(bookId: number): Promise<BookResponse> {
  const response = await getRequest(booksUrl(bookId));
  expect(statusCode(response)).toBe(HTTP_200_OK);

  return await parseResponse<BookResponse>(response);
}
