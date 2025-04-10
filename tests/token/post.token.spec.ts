import { TokenResponse } from '@api-models/token/token.model';
import { API_LOGIN } from '@const/endpoints.const';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { postRequest } from '@requests/post.request';

test.describe('POST /token 2xx', { tag: ['@token', '@smoke'] }, () => {
  test('create new admin token', async () => {
    const response = await postRequest(API_LOGIN, {
      username: 'admin',
      password: 'MkRBpjDAyGsQox&2xhg8',
    });

    expect(statusCode(response)).toBe(HTTP_200_OK);

    const responseBody = await parseResponse<TokenResponse>(response);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
  });
});
