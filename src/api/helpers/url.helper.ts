import { API_AUTHORS } from '@const/endpoints.const';

export type QueryParams = Record<string, string | number | boolean>;

export function buildResourceUrl(endpoint: string, idOrParams?: number | QueryParams, params?: QueryParams): string {
  let url = endpoint;

  if (typeof idOrParams === 'number') {
    url += `/${String(idOrParams)}`;
  } else {
    params = idOrParams;
  }

  if (params && Object.keys(params).length > 0) {
    const stringParams = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
    const queryString = new URLSearchParams(stringParams).toString();
    url += `?${queryString}`;
  }

  return url;
}

export function authorsUrl(idOrParams?: number | QueryParams, params?: QueryParams): string {
  return buildResourceUrl(API_AUTHORS, idOrParams, params);
}
