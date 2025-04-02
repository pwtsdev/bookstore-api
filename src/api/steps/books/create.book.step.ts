import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { getRandomBookPayload } from '@datafactory/books/book.data';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { expect } from '@playwright/test';
import { postRequest } from '@requests/post.request';
import { createAuthorAPIStep } from '../authors/create.author.step';
import { readAuthorByIdAPIStep } from '../authors/read.author.step';

export async function createBookAPIStep(payload?: BookPayload): Promise<BookResponse> {
  const author = payload ? await readAuthorByIdAPIStep(payload.authors[0]) : await createAuthorAPIStep();
  const bookPayload = payload ?? getRandomBookPayload(author.id);

  const response = await postRequest(booksUrl(), bookPayload);
  expect(statusCode(response)).toBe(HTTP_201_CREATED);

  const responseBody = await parseResponse<BookResponse>(response);
  expect(responseBody).toHaveProperty('id');
  expect(typeof responseBody.id).toBe('number');
  expect(responseBody.id).toBeTruthy();
  expect(responseBody).toMatchObject({
    title: bookPayload.title,
    year: bookPayload.year,
    price: bookPayload.price,
    available: bookPayload.available,
    authors: [author],
  });

  return responseBody;
}
