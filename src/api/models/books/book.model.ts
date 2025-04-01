// export interface BookPayload {
//   firstName: string;
//   lastName: string;
//   [key: string]: unknown;
// }

import { AuthorResponse } from '@api-models/authors/author.model';

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
