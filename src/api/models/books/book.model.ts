import { AuthorResponse } from '@api-models/authors/author.model';

export interface BookPayload {
  title: string;
  authors: number[];
  year: number;
  price: number;
  available: number;
  [key: string]: unknown;
}

export interface BookResponse {
  id: number;
  title: string;
  year: number;
  price: number;
  available: number;
  coverId: number;
  authors: AuthorResponse[];
  [key: string]: unknown;
}
