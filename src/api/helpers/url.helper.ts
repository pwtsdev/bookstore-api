import { API_AUTHORS } from '@const/endpoints.const';

export function buildResourceUrl(endpoint: string, id?: number): string {
  return id ? `${endpoint}/${String(id)}` : endpoint;
}

export function authorsUrl(id?: number): string {
  return buildResourceUrl(API_AUTHORS, id);
}
