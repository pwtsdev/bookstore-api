export interface RecipientResponse {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  email: string;
  [key: string]: unknown;
}
