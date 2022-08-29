import { logout } from "~/sessions/auth.session";

export const loader = async ({ request }) => {
  return logout(request);
};
