import { AuthorPayload } from '@api-models/authors/author.model';
import { getRandomFirstName, getRandomLastName } from '@helpers/random.data.helper';

type Override<T> = Partial<T>;

export function getRandomAuthorPayload(): AuthorPayload {
  return {
    firstName: getRandomFirstName(),
    lastName: getRandomLastName(),
  };
}

export function getRandomAuthorOverridePayload(overrides: Override<AuthorPayload>): AuthorPayload {
  return {
    ...getRandomAuthorPayload(),
    ...overrides,
  };
}
