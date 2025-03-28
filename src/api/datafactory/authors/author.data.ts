import { AuthorPayload } from '@api-models/authors/authors.model';
import { getRandomFirstName, getRandomLastName } from '@helpers/random.data.helper';

export function getRandomAuthorPayload(): AuthorPayload {
  return {
    firstName: getRandomFirstName(),
    lastName: getRandomLastName(),
  };
}
