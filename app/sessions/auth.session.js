import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { config } from "~/skawe/modules/config";
import { auth } from "~/skawe/firebase/firebase.server";
import { strToUnderscore } from "~/skawe/modules/utils";

if (!process.env.USER_SESSION_KEY) {
  throw new Error("USER_SESSION_KEY must be set");
}

/**
 * Cookie max age
 * const TWO_WEEKS_IN_MS = 14 * 60 * 60 * 24 * 1000;
 * const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;
 */
const ONE_WEEK_IN_MS = 7 * 60 * 60 * 24;

export const sessionStorage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    ...config.cookies,
    name: `${strToUnderscore(config.cookies.name)}.Auth`,
  },
});

const USER_SESSION_KEY = process.env.USER_SESSION_KEY;

export async function checkSessionCookie(session) {
  try {
    return await auth.server.verifySessionCookie(session);
  } catch {
    return { uid: undefined };
  }
}

export async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(request) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  const { uid } = await checkSessionCookie(userId);
  if (!uid) return;
  if (uid) return auth.server.getUser(uid);
  throw await logout(request);
}

export async function requireUserId(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? ONE_WEEK_IN_MS // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
