import invariant from "tiny-invariant";
import { getSetting } from "~/skawe/modules/settings";

const siteTitle = getSetting("title");

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

/**
 * @summary Kick off the namespace for Skawe.
 * @namespace Skawe
 */
export const config = {
  cookies: {
    name: siteTitle,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
};
