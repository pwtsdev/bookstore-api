import { ErrorResponse } from '@api-models/response.error.model';
import { BAD_REQUEST } from '@const/http.messages.const';
import { HTTP_400_BAD_REQUEST } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl } from '@helpers/url.helper';
import { postRequest } from '@requests/post.request';
import { invalidAuthorPayload } from 'tests/test-data/authors/invalid-author.testdata';

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
