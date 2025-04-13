import { BookResponse } from '@api-models/books/book.model';
import { OrderItemPayload, OrderPayload } from '@api-models/orders/order.model';
import { RecipientPayload } from '@api-models/orders/recipient.model';
import { ErrorResponse } from '@api-models/response.error.model';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { CAN_NOT_FIND_BOOK_ERROR, ORDER_ITEM_BOOK_ID_INCORRECT_DATA } from '@const/response.errors.const';
import { NON_EXISTING_ID } from '@const/validation.const';
import { getRandomRecipientPayload } from '@datafactory/orders/recipient/recipient.data';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { createBookAPIStep } from 'src/api/steps/books/create.book.step';

const invalidBookId = [
  {
    orderItem: { bookId: null, quantity: 1 },
    description: 'empty bookId',
    errorMessage: ORDER_ITEM_BOOK_ID_INCORRECT_DATA,
  },
  {
    orderItem: { bookId: undefined, quantity: 1 },
    description: 'missing bookId',
    errorMessage: ORDER_ITEM_BOOK_ID_INCORRECT_DATA,
  },
  {
    orderItem: { bookId: '', quantity: 1 },
    description: 'empty string bookId',
    errorMessage: ORDER_ITEM_BOOK_ID_INCORRECT_DATA,
  },
  {
    orderItem: { bookId: NON_EXISTING_ID, quantity: 1 },
    description: 'non existing bookId',
    errorMessage: CAN_NOT_FIND_BOOK_ERROR,
  },
];

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

  invalidBookId.forEach(({ orderItem, description, errorMessage }) => {
    test(`bookId: ${description}`, async () => {
      orderPayload.items = [orderItem] as unknown as OrderItemPayload[];

      const response = await postRequest(ordersUrl(), orderPayload);
      expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

      const responseBody = await parseResponse<ErrorResponse>(response);
      expect(responseBody.message).toContain(errorMessage);
    });
  });
});
