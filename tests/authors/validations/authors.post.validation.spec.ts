import { ErrorResponse } from '@api-models/response.error.model';
import { BAD_REQUEST } from '@const/http.messages.const';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { FIRST_NAME_INCORRECT_DATA, LAST_NAME_INCORRECT_DATA } from '@const/response.errors.const';
import { MAX_LENGTH, MIN_LENGTH } from '@const/validation.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { getRandomFirstName, getRandomLastName } from '@helpers/random.data.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';

const invalidAuthorPayload = [
  {
    authorPayload: { firstName: '', lastName: getRandomLastName() },
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'empty firstName',
  },
  {
    authorPayload: { firstName: 'a'.repeat(MIN_LENGTH - 1), lastName: getRandomLastName() },
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'firstName less than 3 characters',
  },
  {
    authorPayload: { firstName: 'a'.repeat(MAX_LENGTH + 1), lastName: getRandomLastName() },
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'firstName more than 128 characters',
  },
  {
    authorPayload: { firstName: 'Bar7ek', lastName: getRandomLastName() },
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'firstName with invalid characters',
  },
  {
    authorPayload: { firstName: getRandomFirstName(), lastName: '' },
    message: LAST_NAME_INCORRECT_DATA,
    description: 'empty lastName',
  },
  {
    authorPayload: { firstName: getRandomFirstName(), lastName: 'a'.repeat(MIN_LENGTH - 1) },
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName less than 3 characters',
  },
  {
    authorPayload: { firstName: getRandomFirstName(), lastName: 'a'.repeat(MAX_LENGTH + 1) },
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName more than 128 characters',
  },
  {
    authorPayload: { firstName: getRandomFirstName(), lastName: 'Tes7ow4' },
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName with invalid characters',
  },
];

test.describe('POST /authors 4xx', { tag: ['@authors', '@validation', '@4xx'] }, () => {
  invalidAuthorPayload.forEach(({ authorPayload, message, description }) => {
    test(`author: ${description}`, async () => {
      const response = await postRequest(authorsUrl(), authorPayload);
      expect(statusCode(response)).toBe(HTTP_400_BAD_REQUEST);

      const responseBody = await parseResponse<ErrorResponse>(response);
      expect(responseBody.error).toBe(BAD_REQUEST);
      expect(responseBody.message).toContain(message);
    });
  });
});
