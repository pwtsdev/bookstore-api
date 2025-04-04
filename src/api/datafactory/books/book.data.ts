import { BookPayload } from '@api-models/books/book.model';
import { getRandomBookTitle } from '@helpers/random.data.helper';

type Override<T> = Partial<T>;

export function getRandomBookPayload(authorId?: number): BookPayload {
  return {
    title: getRandomBookTitle(),
    authors: authorId !== undefined ? [authorId] : ([] as number[]),
    year: 2025,
    price: 19.99,
    available: 1000,
  };
}

export function getRandomBookOverridePayload(overrides: Override<BookPayload>): BookPayload {
  return {
    ...getRandomBookPayload(),
    ...overrides,
  };
}
