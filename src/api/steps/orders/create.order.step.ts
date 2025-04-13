import { BookResponse } from '@api-models/books/book.model';
import { OrderItemPayload, OrderPayload, OrderResponse } from '@api-models/orders/order.model';
import { RecipientPayload } from '@api-models/orders/recipient.model';
import { HTTP_201_CREATED } from '@const/http.status.codes.const';
import { getRandomRecipientPayload } from '@datafactory/orders/recipient/recipient.data';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { expect } from '@playwright/test';
import { postRequest } from '@requests/post.request';
import { createBookAPIStep } from '../books/create.book.step';

export async function createOrderAPIStep(payload?: OrderPayload): Promise<OrderResponse> {
  let book: BookResponse;
  let bookId: number;

  let recipientPayload: RecipientPayload;
  let orderItemPayload: OrderItemPayload;
  let orderPayload: OrderPayload;

  if (!payload) {
    book = await createBookAPIStep();
    bookId = book.id;

    recipientPayload = getRandomRecipientPayload();
    orderItemPayload = { bookId, quantity: 1 };
    orderPayload = { items: [orderItemPayload], recipient: recipientPayload };
  } else {
    orderPayload = payload;
  }

  const response = await postRequest(ordersUrl(), orderPayload);
  expect(statusCode(response)).toBe(HTTP_201_CREATED);

  const responseData = await parseResponse<OrderResponse>(response);
  expect(responseData).toHaveProperty('id');

  return responseData;
}
