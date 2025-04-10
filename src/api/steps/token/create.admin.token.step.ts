import { TokenResponse } from '@api-models/token/token.model';
import { API_LOGIN } from '@const/endpoints.const';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { getAdminCredentialsPayload } from '@datafactory/login/login.data';
import { expect } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { postRequest } from '@requests/post.request';

export async function createAdminTokenAPIStep(): Promise<string> {
  const response = await postRequest(API_LOGIN, getAdminCredentialsPayload());

  expect(statusCode(response)).toBe(HTTP_200_OK);

  const responseBody = await parseResponse<TokenResponse>(response);
  expect(responseBody).toHaveProperty('token');
  expect(responseBody.token).toBeTruthy();

  return responseBody.token;
}
