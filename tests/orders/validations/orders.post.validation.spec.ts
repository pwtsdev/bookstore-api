import { BookResponse } from '@api-models/books/book.model';
import { OrderItemPayload, OrderPayload } from '@api-models/orders/order.model';
import { RecipientPayload } from '@api-models/orders/recipient.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import {
  ORDER_RECIPIENT_CITY_INCORRECT_DATA,
  ORDER_RECIPIENT_EMAIL_INCORRECT_DATA,
  ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  ORDER_RECIPIENT_PHONE_INCORRECT_DATA,
  ORDER_RECIPIENT_STREET_INCORRECT_DATA,
} from '@const/response.errors.const';
import { getRandomRecipientPayload } from '@datafactory/orders/recipient/recipient.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';

test.describe('POST /orders 4xx', { tag: ['@orders', '@validation'] }, () => {
  let book: BookResponse;
  let bookId: number;

  let recipientPayload: RecipientPayload;
  let orderItemPayload: OrderItemPayload;
  let orderPayload: OrderPayload;

  test.beforeEach(async () => {
    book = await createBookAPIStep();
    bookId = book.id;

    recipientPayload = getRandomRecipientPayload();
    orderItemPayload = { bookId, quantity: 1 };
    orderPayload = { items: [orderItemPayload], recipient: recipientPayload };
  });

  test.fixme('empty order items', async () => {
    orderPayload.items = [];

    const response = await postRequest(ordersUrl(), orderPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);
  });

  test('empty recipient', async () => {
    orderPayload.recipient = {} as RecipientPayload;

    const response = await postRequest(ordersUrl(), orderPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const expectedMessages = [
      ORDER_RECIPIENT_CITY_INCORRECT_DATA,
      ORDER_RECIPIENT_EMAIL_INCORRECT_DATA,
      ORDER_RECIPIENT_NAME_INCORRECT_DATA,
      ORDER_RECIPIENT_PHONE_INCORRECT_DATA,
      ORDER_RECIPIENT_STREET_INCORRECT_DATA,
    ];

    const responseBody = await parseResponse<ErrorResponse>(response);

    expectedMessages.forEach((msg) => {
      expect(responseBody.message).toContain(msg);
    });
  });
});
