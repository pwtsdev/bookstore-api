import { getRandomFirstName, getRandomLastName } from '../../helpers/random.data.helper';
import { AuthorPayload } from '../../models/authors/authors.model';

export function getRandomAuthorPayload(): AuthorPayload {
  return {
    firstName: getRandomFirstName(),
    latName: getRandomLastName(),
  };
}
