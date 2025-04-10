/* eslint-disable @typescript-eslint/naming-convention */
export function getHeadersWithToken(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  };
}
