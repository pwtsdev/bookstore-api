import { expect, test } from '@playwright/test';

test('should return status code 200 ok', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(response.status()).toBe(200);
});
