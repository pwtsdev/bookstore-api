import { TokenPayload } from '@api-models/token/token.model';

export function getAdminCredentials(): TokenPayload {
  return {
    username: String(process.env.API_ADMIN_USERNAME),
    password: String(process.env.API_ADMIN_PASSWORD),
  };
}
