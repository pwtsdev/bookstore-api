import { OrderResponse } from '@api-models/orders/order.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';
import { EXISTING_ORDER_FIXTURE } from 'tests/fixtures/order.fixture';

const EXISTING_ORDER_ID = 1;

test.describe('GET /orders 2xx', { tag: ['@orders', '@smoke'] }, () => {
  test('read a single order', async () => {
    const response = await getRequest(ordersUrl(EXISTING_ORDER_ID));
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const orderResponse = await parseResponse<OrderResponse>(response);
    expect(orderResponse).toMatchObject(EXISTING_ORDER_FIXTURE);
  });

  test('read all orders', async () => {
    const response = await getRequest(ordersUrl());
    expect(statusCode(response)).toBe(HTTP_200_OK);

    const orders = await parseResponse<OrderResponse[]>(response);
    expect(orders.length).toBeGreaterThanOrEqual(1);
  });
});
