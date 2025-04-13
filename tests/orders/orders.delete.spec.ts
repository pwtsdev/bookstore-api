import { OrderResponse } from '@api-models/orders/order.model';
import { HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { getHeadersWithToken } from '@helpers/auth.helper';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { deleteRequest } from '@requests/delete.request';
import { getRequest } from '@requests/get.request';
import { createOrderAPIStep } from 'src/api/steps/orders/create.order.step';
import { createAdminTokenAPIStep } from 'src/api/steps/token/create.admin.token.step';

test.describe('DELETE /orders 2xx', { tag: ['@orders', '@smoke'] }, () => {
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

  test('delete existing order', async () => {
    const response = await deleteRequest(ordersUrl(orderId), headers);
    expect(statusCode(response)).toBe(HTTP_204_NO_CONTENT);

    const getResponse = await getRequest(ordersUrl(orderId));
    expect(statusCode(getResponse)).toBe(HTTP_404_NOT_FOUND);
  });
});
