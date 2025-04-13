import { BookResponse } from '@api-models/books/book.model';
import { OrderItemPayload, OrderPayload } from '@api-models/orders/order.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';
import { invalidRecipientPayload } from 'tests/test-data/orders/invalid-order-recipient.testdata';

test.describe.parallel('POST /orders 4xx', { tag: ['@orders', '@validation'] }, () => {
  let book: BookResponse;
  let bookId: number;

  let orderPayload: OrderPayload;
  let orderItemPayload: OrderItemPayload;

  test.beforeEach(async () => {
    book = await createBookAPIStep();
    bookId = book.id;

    orderItemPayload = { bookId, quantity: 1 };
  });

  invalidRecipientPayload.forEach(({ recipientPayload, description, errorMessage }) => {
    test(`recipient: ${description}`, async () => {
      orderPayload = { items: [orderItemPayload], recipient: recipientPayload };

      const response = await postRequest(ordersUrl(), orderPayload);
      expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

      const responseBody = await parseResponse<ErrorResponse>(response);
      expect(responseBody.message).toContain(errorMessage);
    });
  });
});
