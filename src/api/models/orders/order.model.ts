export interface OrderPayload {
  items: OrderItemPayload[];
  recipient: RecipientPayload;
}

import { BookResponse } from '@api-models/books/book.model';
import { RecipientPayload, RecipientResponse } from './recipient.model';

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

export interface OrderItemPayload {
  bookId: number;
  quantity: number;
}
