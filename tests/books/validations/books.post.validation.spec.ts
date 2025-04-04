import { AuthorResponse } from '@api-models/authors/author.model';
import { BookPayload } from '@api-models/books/book.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_409_CONFLICT } from '@const/http.status.codes.const';
import {
  AUTHORS_INCORRECT_DATA,
  AVAILABLE_INCORRECT_DATA,
  CAN_NOT_FIND_AUTHOR_ERROR,
  MAX_AVAILABLE_ERROR,
  MIN_AVAILABLE_ERROR,
  PRICE_INCORRECT_DATA,
  TITLE_INCORRECT_DATA,
  YEAR_INCORRECT_DATA,
} from '@const/response.errors.const';
import { MAX_AVAILABLE, MAX_PRICE, MIN_AVAILABLE, MIN_PRICE, NON_EXISTING_ID } from '@const/validation.const';
import { getRandomBookPayload } from '@datafactory/books/book.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';

test.describe('POST /books 4xx', { tag: ['@books', '@validation', '@4xx'] }, () => {
  let existingAuthor: AuthorResponse;
  let authorId: number;
  let randomBookPayload: BookPayload;

  test.beforeEach('create test data', async () => {
    existingAuthor = await createAuthorAPIStep();
    authorId = existingAuthor.id;

    randomBookPayload = getRandomBookPayload(authorId);
  });

  // test.afterEach(async () => {
  //   if (bookId) await deleteBookAPIStep(bookId);
  //   if (authorId) await deleteAuthorAPIStep(authorId);
  // });

  test('empty json', async () => {
    const response = await postRequest(booksUrl(), {} as BookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);

    const expectedMessages = [
      YEAR_INCORRECT_DATA,
      PRICE_INCORRECT_DATA,
      AVAILABLE_INCORRECT_DATA,
      AUTHORS_INCORRECT_DATA,
      TITLE_INCORRECT_DATA,
    ];

    expectedMessages.forEach((message) => {
      expect(responseBody.message).toContain(message);
    });
  });

  test('empty authors', async () => {
    const bookPayload = getRandomBookPayload();
    const response = await postRequest(booksUrl(), bookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(AUTHORS_INCORRECT_DATA);
  });

  test('year before 1900', async () => {
    randomBookPayload.year = 1899;

    const response = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(YEAR_INCORRECT_DATA);
  });

  test('above max price', async () => {
    randomBookPayload.price = MAX_PRICE + 1;

    const response = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(PRICE_INCORRECT_DATA);
  });

  test.fixme('below min price', async () => {
    randomBookPayload.price = MIN_PRICE - 0.5;

    const response = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(PRICE_INCORRECT_DATA);
  });

  test('above max available', async () => {
    randomBookPayload.available = MAX_AVAILABLE + 1;

    const response = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(MAX_AVAILABLE_ERROR);
  });

  test('below min available', async () => {
    randomBookPayload.available = MIN_AVAILABLE - 0.5;

    const response = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(MIN_AVAILABLE_ERROR);
  });

  test('author id does not exist', async () => {
    randomBookPayload.authors = [NON_EXISTING_ID];

    const response = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.message).toContain(`${CAN_NOT_FIND_AUTHOR_ERROR} ${String(NON_EXISTING_ID)}`);
  });

  test('book with given title already exist', async () => {
    const responseOne = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(responseOne)).toBe(HTTP_201_CREATED);

    const responseTwo = await postRequest(booksUrl(), randomBookPayload);
    expect(statusCode(responseTwo)).toBe(HTTP_409_CONFLICT);
  });
});
