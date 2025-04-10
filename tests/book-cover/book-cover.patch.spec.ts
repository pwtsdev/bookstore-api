/* eslint-disable @typescript-eslint/naming-convention */
import { BookResponse } from '@api-models/books/book.model';
import { HTTP_202_ACCEPTED } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { statusCode } from '@helpers/response.status.helper';
import { booksCoverUrl } from '@helpers/url.helper';
import { patchMultiFormRequest } from '@requests/patch.request';
import fs from 'fs';
import path from 'path';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { createAdminTokenAPIStep } from 'src/api/steps/token/create.admin.token.step';

test.describe('PATCH /books/:id/cover 2xx', { tag: ['@book-cover', '@slow'] }, () => {
  let existingBook: BookResponse;
  let bookId: number;
  // let authorId: number;
  let adminToken: string;

  test.beforeEach('create test data', async () => {
    // EXISTING BOOK
    existingBook = await createBookAPIStep();
    bookId = existingBook.id;
    // authorId = existingBook.authors[0].id;

    adminToken = await createAdminTokenAPIStep();
  });

  test('update book cover', async () => {
    const filePath = path.resolve(__dirname, '../../resources/img/book-cover.png');
    const fileBuffer = fs.readFileSync(filePath);

    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), 'book-cover.png');

    const headers = {
      Authorization: `Bearer ${adminToken}`,
    };

    const response = await patchMultiFormRequest(booksCoverUrl(bookId), formData, headers);

    expect(statusCode(response)).toBe(HTTP_202_ACCEPTED);
  });
});
