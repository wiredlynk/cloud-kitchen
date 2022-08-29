import { auth } from "~/skawe/firebase/firebase.server";

/**
 * Cookie max age
 * const TWO_WEEKS_IN_MS = 14 * 60 * 60 * 24 * 1000;
 * const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;
 */
const ONE_WEEK_IN_MS = 7 * 60 * 60 * 24;

export const signIn = async (email, password) => {
  const { idToken } = await auth.signInWithPassword(email, password);
  return signInWithToken(idToken);
};

export const signInWithToken = async (idToken) => {
  const expiresIn = ONE_WEEK_IN_MS * 1000; // 1 week
  return await auth.server.createSessionCookie(idToken, {
    expiresIn,
  });
};

export const createUser = async (email, password) => {
  await auth.server.createUser({
    email,
    password,
    displayName: email.slice(0, email.indexOf("@")),
  });
  return await signIn(email, password);
};

export async function updateUser(userId, data) {
  return await auth.server.updateUser(userId, data);
}

// Retrive all users
export async function getUsers() {
  return await auth.server.listUsers();
}
