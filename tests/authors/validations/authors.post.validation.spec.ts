import { ErrorResponse } from '@api-models/response.error.model';
import { BAD_REQUEST } from '@const/http.messages.const';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomFirstName, getRandomLastName } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';

test.describe('POST /authors 4xx', { tag: ['@authors', '@validation', '@4xx'] }, () => {
  test('empty firstName', async () => {
    const authorPayload = { firstName: '', lastName: getRandomLastName() };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('firstName incorrect input data');
  });

  test('firstName less than 3 characters', async () => {
    const authorPayload = { firstName: 'a'.repeat(2), lastName: getRandomLastName() };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('firstName incorrect input data');
  });

  test('firstName more than 128 characters', async () => {
    const authorPayload = { firstName: 'a'.repeat(129), lastName: getRandomLastName() };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('firstName incorrect input data');
  });

  test('firstName with invalid characters', async () => {
    const authorPayload = { firstName: 'Bar7ek', lastName: getRandomLastName() };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('firstName incorrect input data');
  });

  test('empty lastName', async () => {
    const authorPayload = { firstName: getRandomFirstName(), lastName: '' };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('lastName incorrect input data');
  });

  test('lastName less than 3 characters', async () => {
    const authorPayload = { firstName: getRandomFirstName(), lastName: 'a'.repeat(2) };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('lastName incorrect input data');
  });

  test('lastName more than 128 characters', async () => {
    const authorPayload = { firstName: getRandomFirstName(), lastName: 'a'.repeat(129) };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('lastName incorrect input data');
  });

  test('lastName with invalid characters', async () => {
    const authorPayload = { firstName: getRandomFirstName(), lastName: 'Tes7ow4' };
    const response = await postRequest(authorsUrl(), authorPayload);
    expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

    const responseBody = await parseResponse<ErrorResponse>(response);
    expect(responseBody.error).toBe(BAD_REQUEST);
    expect(responseBody.message).toContain('lastName incorrect input data');
  });
});
