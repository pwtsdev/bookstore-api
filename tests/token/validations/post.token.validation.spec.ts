import { API_LOGIN } from '@const/endpoints.const';
import { HTTP_401_UNAUTHORIZED } from '@const/http.status.codes.const';
import { getAdminCredentialsOverridePayload } from '@datafactory/login/login.data';
import { expect, test } from '@fixtures/api.fixture';
import { statusCode } from '@helpers/response.status.helper';
import { postRequest } from '@requests/post.request';

const invalidCredentials = [
  {
    adminPayload: getAdminCredentialsOverridePayload({ username: '', password: '' }),
    description: 'empty username and password',
  },
  {
    adminPayload: getAdminCredentialsOverridePayload({ username: '123' }),
    description: 'invalid username',
  },
  {
    adminPayload: getAdminCredentialsOverridePayload({ password: '123' }),
    description: 'invalid password',
  },
  {
    adminPayload: getAdminCredentialsOverridePayload({ password: undefined }),
    description: 'empty password',
  },
  {
    adminPayload: getAdminCredentialsOverridePayload({ username: undefined }),
    description: 'empty username',
  },
  {
    adminPayload: getAdminCredentialsOverridePayload({ username: undefined, password: undefined }),
    description: 'empty json',
  },
];

test.describe('POST /login 4xx', { tag: ['@token', '@validation'] }, () => {
  invalidCredentials.forEach(({ adminPayload, description }) => {
    test(`admin: ${description}`, async () => {
      const response = await postRequest(API_LOGIN, adminPayload);

      expect(statusCode(response)).toBe(HTTP_401_UNAUTHORIZED);
    });
  });
});
