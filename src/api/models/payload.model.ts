import { AuthorPayload } from './authors/author.model';
import { BookPayload } from './books/book.model';
import { TokenPayload } from './token/token.model';

export type APIPayload = AuthorPayload | BookPayload | TokenPayload;
