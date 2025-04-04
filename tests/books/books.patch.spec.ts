import { AuthorResponse } from '@api-models/authors/author.model';
import { BookPayload, BookResponse } from '@api-models/books/book.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomBookTitle } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { booksUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { createAuthorAPIStep } from 'src/api/steps/authors/create.author.step';
import { deleteAuthorAPIStep } from 'src/api/steps/authors/delete.author.step';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { deleteBookAPIStep } from 'src/api/steps/books/delete.book.step';

test.describe('PATCH /books 2xx', { tag: ['@books', '@smoke'] }, () => {
  const authorsIds: number[] = [];

  let existingBook: BookResponse;
  let randomBookTitle: string;
  let bookId: number;
  let authorId: number;
  let newAuthor: AuthorResponse;

  test.beforeEach('create test data', async () => {
    // EXISTING BOOK
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    authorId = existingBook.authors[0].id;
    authorsIds.push(authorId);

    randomBookTitle = getRandomBookTitle();
  });

  test.afterEach(async () => {
    if (bookId) await deleteBookAPIStep(bookId);
    await Promise.all(authorsIds.map((id) => deleteAuthorAPIStep(id)));
  });

  test('update book title', async () => {
    const bookPayload = { title: randomBookTitle } as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    existingBook.title = randomBookTitle;
    expect(responseBody).toMatchObject(existingBook);
  });

  test('update authors', async () => {
    newAuthor = await createAuthorAPIStep();
    authorsIds.push(newAuthor.id);

    const bookPayload = { authors: [newAuthor.id] } as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    existingBook.authors = [newAuthor];
    expect(responseBody).toMatchObject(existingBook);
  });

  test('update year', async () => {
    const updatedYear = 2000;

    const bookPayload = { year: updatedYear } as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    existingBook.year = updatedYear;
    expect(responseBody).toMatchObject(existingBook);
  });

  test('update price', async () => {
    const updatedPrice = 29.99;

    const bookPayload = { price: updatedPrice } as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    existingBook.price = updatedPrice;
    expect(responseBody).toMatchObject(existingBook);
  });

  test('update available', async () => {
    const updatedAvailable = 1;

    const bookPayload = { available: updatedAvailable } as BookPayload;
    const response = await patchRequest(booksUrl(existingBook.id), bookPayload);
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<BookResponse>(response);
    existingBook.available = updatedAvailable;
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
