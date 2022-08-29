import { createCookieSessionStorage } from "remix";
import { config } from "~/skawe/modules/config";

export const themeStorage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    ...config.cookies,
    name: `${config.cookies.name}.Theme`,
  },
});
