import { AuthorResponse } from '@api-models/authors/author.model';
import { HTTP_200_OK } from '@const/http.status.codes.const';
import { expect, test } from '@fixtures/api.fixture';
import { parseResponse } from '@helpers/parse.response.helper';
import { statusCode } from '@helpers/response.status.helper';
import { authorsUrl, QueryParams } from '@helpers/url.helper';
import { getRequest } from '@requests/get.request';

const EXPECTED_FIRST_NAME = 'Joshua';
const EXPECTED_LAST_NAME = 'Bloch';
const NON_EXISTING_NAME = 'XXXXXX';

const existingAuthors = [
  {
    queryParams: { firstName: EXPECTED_FIRST_NAME },
    description: 'search by firstName',
  },
  {
    queryParams: { lastName: EXPECTED_LAST_NAME },
    description: 'search by lastName',
  },
  {
    queryParams: { firstName: EXPECTED_FIRST_NAME, lastName: EXPECTED_LAST_NAME } as QueryParams,
    description: 'search by firstName and lastName',
  },
];

const nonExistingAuthors = [
  {
    queryParams: { firstName: NON_EXISTING_NAME },
    description: 'search by non existing firstName',
  },
  {
    queryParams: { lastName: NON_EXISTING_NAME },
    description: 'search by non existing lastName',
  },
  {
    queryParams: { firstName: NON_EXISTING_NAME, lastName: NON_EXISTING_NAME } as QueryParams,
    description: 'search by non existing firstName and lastName',
  },
];

test.describe('GET /authors 2xx', { tag: ['@authors', '@smoke', '@search'] }, () => {
  existingAuthors.forEach(({ queryParams, description }) => {
    test(`authors: ${description}`, async () => {
      const response = await getRequest(authorsUrl(queryParams));
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const authors = await parseResponse<AuthorResponse[]>(response);
      expect(authors.length).toBeGreaterThanOrEqual(1);
    });
  });

  nonExistingAuthors.forEach(({ queryParams, description }) => {
    test(`authors: ${description}`, async () => {
      const response = await getRequest(authorsUrl(queryParams));
      expect(statusCode(response)).toBe(HTTP_200_OK);

      const authors = await parseResponse<AuthorResponse[]>(response);
      expect(authors.length).toBe(0);
    });
  });
});
