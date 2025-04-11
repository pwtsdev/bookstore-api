import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { statusCode } from '@helpers/response.status.helper';
import { ordersUrl } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';

const EXISTING_ORDER_ID = 1;

test.describe('GET /orders 2xx', { tag: ['@orders', '@smoke'] }, () => {
  test('read a single order', async () => {
    const response = await getRequest(ordersUrl(EXISTING_ORDER_ID));
    expect(statusCode(response)).toBe(HTTP_200_OK);
  });
});
