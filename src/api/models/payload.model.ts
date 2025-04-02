import { AuthorPayload } from './authors/author.model';
import { BookPayload } from './books/book.model';

export type APIPayload = AuthorPayload | BookPayload;
