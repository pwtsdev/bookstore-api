// export interface OrderPayload {}

import { BookResponse } from '@api-models/books/book.model';
import { RecipientResponse } from './recipient.model';

type OrderStatus = 'NEW' | 'PAID' | 'CANCELLED' | 'COMPLETED' | 'ABANDONED' | 'SHIPPED';

export interface OrderResponse {
  id: number;
  status: OrderStatus;
  items: OrderItemResponse[];
  recipient: RecipientResponse;
}

interface OrderItemResponse {
  id: number;
  book: BookResponse;
  quantity: number;
}
