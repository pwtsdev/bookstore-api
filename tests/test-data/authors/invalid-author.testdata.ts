import { FIRST_NAME_INCORRECT_DATA, LAST_NAME_INCORRECT_DATA } from '@const/response.errors.const';
import { MAX_LENGTH, MIN_LENGTH } from '@const/validation.const';
import { getRandomAuthorOverridePayload } from '@datafactory/authors/author.data';

export const invalidAuthorPayload = [
  {
    authorPayload: getRandomAuthorOverridePayload({ firstName: undefined }),
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'missing firstName',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ firstName: '' }),
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'empty firstName',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ firstName: 'a'.repeat(MIN_LENGTH - 1) }),
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'firstName less than 3 characters',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ firstName: 'a'.repeat(MAX_LENGTH + 1) }),
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'firstName more than 128 characters',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ firstName: 'Bar7ek' }),
    message: FIRST_NAME_INCORRECT_DATA,
    description: 'firstName with invalid characters',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ lastName: undefined }),
    message: LAST_NAME_INCORRECT_DATA,
    description: 'missing lastName',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ lastName: '' }),
    message: LAST_NAME_INCORRECT_DATA,
    description: 'empty lastName',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ lastName: 'a'.repeat(MIN_LENGTH - 1) }),
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName less than 3 characters',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ lastName: 'a'.repeat(MAX_LENGTH + 1) }),
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName more than 128 characters',
  },
  {
    authorPayload: getRandomAuthorOverridePayload({ lastName: 'Test70w7' }),
    message: LAST_NAME_INCORRECT_DATA,
    description: 'lastName with invalid characters',
  },
];
