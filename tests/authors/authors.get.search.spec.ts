/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test, { expect } from '@playwright/test';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';
const NON_EXISTING_NAME = 'XXXXXX';

test.describe('GET /authors 2xx', { tag: ['@authors', '@smoke', '@search'] }, () => {
  test('search by firstName', async ({ request }) => {
    const response = await request.get('/authors', {
      params: {
        firstName: EXPECTED_FIRST_NAME,
      },
    });
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('search by non existing firstName', async ({ request }) => {
    const response = await request.get('/authors', {
      params: {
        firstName: NON_EXISTING_NAME,
      },
    });
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBe(0);
  });

  test('search by lastName', async ({ request }) => {
    const response = await request.get('/authors', {
      params: {
        lastName: EXPECTED_LAST_NAME,
      },
    });
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('search by non existing lastName', async ({ request }) => {
    const response = await request.get('/authors', {
      params: {
        lastName: NON_EXISTING_NAME,
      },
    });
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBe(0);
  });

  test('search by firstName and lastName', async ({ request }) => {
    const response = await request.get('/authors', {
      params: {
        firstName: EXPECTED_FIRST_NAME,
        lastName: EXPECTED_LAST_NAME,
      },
    });
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBeGreaterThanOrEqual(1);
  });

  test('search by non existing firstName and non existing lastName', async ({ request }) => {
    const response = await request.get('/authors', {
      params: {
        firstName: NON_EXISTING_NAME,
        lastName: NON_EXISTING_NAME,
      },
    });
    expect(response.status()).toBe(200);

    const authors = await response.json();
    expect(authors.length).toBe(0);
  });
});
