import { OrderPayload, OrderResponse } from '@api-models/orders/order.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { ORDER_STATUS_ABANDONED, ORDER_STATUS_CANCELED, ORDER_STATUS_PAID } from '@const/order.status.const';
import { expect, test } from '@fixtures/api.fixture';
import { getHeadersWithToken } from '@helpers/auth.helper';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersStatusUrl } from '@helpers/url.helper';
import { patchRequest } from '@requests/patch.request';
import { createOrderAPIStep } from 'src/api/steps/orders/create.order.step';
import { createAdminTokenAPIStep } from 'src/api/steps/token/create.admin.token.step';

const validOrderStatus = [
  {
    orderStatus: ORDER_STATUS_PAID,
    description: 'should return 200 for status PAID',
  },
  {
    orderStatus: ORDER_STATUS_CANCELED,
    description: 'should return 200 for status CANCELED',
  },
  {
    orderStatus: ORDER_STATUS_ABANDONED,
    description: 'should return 200 for status ABANDONED',
  },
];

test.describe('PATCH /orders/:id/status 2xx', { tag: ['@orders', '@smoke'] }, () => {
  let order: OrderResponse;
  let orderId: number;
  let token: string;
  let headers: Record<string, string>;

  test.beforeEach('create test data', async () => {
    order = await createOrderAPIStep();
    orderId = order.id;

    token = await createAdminTokenAPIStep();
    headers = getHeadersWithToken(token);
  });

  validOrderStatus.forEach(({ orderStatus, description }) => {
    test(`order status: ${description}`, async () => {
      const payload = { status: orderStatus } as unknown as OrderPayload;
      const response = await patchRequest(ordersStatusUrl(orderId), payload, headers);
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const responseBody = await parseResponse<OrderResponse>(response);
      expect(responseBody.status).toBe(orderStatus);
    });
  });
});
