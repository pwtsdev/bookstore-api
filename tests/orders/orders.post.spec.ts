import { BookResponse } from '@api-models/books/book.model';
import { OrderItemPayload, OrderPayload, OrderResponse } from '@api-models/orders/order.model';
import { RecipientPayload } from '@api-models/orders/recipient.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { getRandomRecipientPayload } from '@datafactory/orders/recipient/recipient.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';

test.describe('POST /orders 2xx', { tag: ['@orders', '@smoke'] }, () => {
  let book: BookResponse;
  let bookId: number;
  let available: number;

  let orderPayload: OrderPayload;
  let recipientPayload: RecipientPayload;
  let orderItemPayload: OrderItemPayload;

  test.beforeEach('create test data', async () => {
    book = await createBookAPIStep();
    bookId = book.id;
    available = book.available;

    orderItemPayload = { bookId, quantity: 1 };
    recipientPayload = getRandomRecipientPayload();

    orderPayload = {
      items: [orderItemPayload],
      recipient: recipientPayload,
    };
  });

  test('create new order', async () => {
    const response = await postRequest(ordersUrl(), orderPayload);
    expect(statusCode(response)).toBe(HTTP_201_CREATED);

    const responseBody = await parseResponse<OrderResponse>(response);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('status', 'NEW');

    book.available = available - 1;
    expect(responseBody).toMatchObject({
      status: 'NEW',
      recipient: recipientPayload,
      items: [{ book: book, quantity: 1 }],
    });
  });
});
