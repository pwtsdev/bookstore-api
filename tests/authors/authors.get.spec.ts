/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test, { expect } from '@playwright/test';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';

test.describe('GET /authors', () => {
  test('read all authors', async ({ request }) => {
    const response = await request.get('/authors');
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('read author by id', async ({ request }) => {
    const response = await request.get('/authors/1');
    expect(response.status()).toBe(200);

    const author = await response.json();
    expect(author.firstName).toBe(EXPECTED_FIRST_NAME);
    expect(author.lastName).toBe(EXPECTED_LAST_NAME);
  });
});
