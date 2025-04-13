import { AuthorPayload } from './authors/author.model';
import { BookPayload } from './books/book.model';
import { OrderPayload } from './orders/order.model';
import { TokenPayload } from './token/token.model';

export type APIPayload = AuthorPayload | BookPayload | TokenPayload | OrderPayload;
