/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';
import test, { expect } from '@playwright/test';
import { authorsUrl } from '../../src/helpers/url.helper';
import { postRequest } from '../../src/requests/post.request';

test.describe('POST /authors 2xx', { tag: ['@authors', '@smoke'] }, () => {
  test('create new author', async () => {
    const FIRST_NAME = faker.person.firstName();
    const LAST_NAME = faker.person.lastName();

    const authorPayload = {
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
    };

    const response = await postRequest(authorsUrl(), authorPayload);
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.firstName).toBe(FIRST_NAME);
    expect(responseBody.lastName).toBe(LAST_NAME);
  });
});
