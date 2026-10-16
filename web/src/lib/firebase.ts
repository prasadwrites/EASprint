import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const useEmulators = import.meta.env.VITE_USE_EMULATORS === "true";

/** Without Firebase config the app keeps progress in this browser and skips sign-in. */
export const firebaseEnabled = !!import.meta.env.VITE_FIREBASE_API_KEY || useEmulators;

const app = firebaseEnabled
  ? initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-easprint",
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    })
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const functions = app ? getFunctions(app, "us-central1") : null;
export const googleProvider = new GoogleAuthProvider();

if (useEmulators && auth && db && functions) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
