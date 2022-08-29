import {
  getApps as getServerApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from "firebase-admin/app";
import { getAuth as getServerAuth } from "firebase-admin/auth";
import * as firebaseRest from "./rest";

if (!process.env.API_KEY) {
  throw new Error("API_KEY must be set");
}

// Warning: though getRestConfig is only run server side, its return value may be sent to the client
export const getRestConfig = () => {
  return {
    apiKey: process.env.API_KEY,
    domain: "https://identitytoolkit.googleapis.com",
  };
};
const restConfig = getRestConfig();

if (getServerApps().length === 0) {
  let config;
  if (process.env.NODE_ENV === "development" && !process.env.SERVICE_ACCOUNT) {
    console.warn(
      "Missing SERVICE_ACCOUNT environment variable, using local emulator"
    );
    // https://github.com/firebase/firebase-admin-node/issues/776
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
    config = {
      projectId: "remix-emulator",
    };
  } else if (!process.env.SERVICE_ACCOUNT) {
    throw new Error("Missing SERVICE_ACCOUNT environment variable");
  } else {
    try {
      const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
      config = {
        credential: serverCert(serviceAccount),
      };
    } catch {
      throw Error("Invalid SERVICE_ACCOUNT environment variable");
    }
  }
  initializeServerApp(config);
}

const signInWithPassword = async (email, password) => {
  const signInResponse = await firebaseRest.signInWithPassword(
    {
      email,
      password,
      returnSecureToken: true,
    },
    restConfig
  );

  if (firebaseRest.isError(signInResponse)) {
    throw new Error(signInResponse.error.message);
  }

  return signInResponse;
};

export const auth = {
  server: getServerAuth(),
  signInWithPassword,
};
