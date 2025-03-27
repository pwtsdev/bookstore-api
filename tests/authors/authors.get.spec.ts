/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test, { expect } from '@playwright/test';
import { getRequest } from '../../src/requests/get.request';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';

test.describe('GET /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  test('read all authors', async () => {
    const response = await getRequest('/authors');
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('read author by id', async () => {
    const response = await getRequest('/authors/1');
    expect(response.status()).toBe(200);

    const author = await response.json();
    expect(author.firstName).toBe(EXPECTED_FIRST_NAME);
    expect(author.lastName).toBe(EXPECTED_LAST_NAME);
  });
});
