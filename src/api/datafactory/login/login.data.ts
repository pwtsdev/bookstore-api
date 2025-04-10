import { TokenPayload } from '@api-models/token/token.model';

type Override<T> = Partial<T>;

export function getAdminCredentialsPayload(): TokenPayload {
  return {
    username: String(process.env.API_ADMIN_USERNAME),
    password: String(process.env.API_ADMIN_PASSWORD),
  };
}

export function getAdminCredentialsOverridePayload(overrides: Override<TokenPayload>): TokenPayload {
  return {
    ...getAdminCredentialsPayload(),
    ...overrides,
  };
}
