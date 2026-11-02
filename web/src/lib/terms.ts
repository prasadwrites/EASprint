import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ADMIN_EMAIL } from "./account";
import { db } from "./firebase";

/**
 * Terms of Use version. Change it whenever the wording of the Terms page changes in a way people should
 * agree to again: everyone whose account records an older version is asked to accept the new one.
 *
 * NOTE FOR THE OWNER: the Terms text in pages/Terms.tsx is a general template written for a US online
 * study service. It is not legal advice. Have a lawyer licensed in your state review it, and fill in
 * GOVERNING_STATE below, before relying on it.
 */
export const TERMS_VERSION = "2026-11-02";
export const TERMS_EFFECTIVE = "November 2, 2026";

/** The US state whose laws govern the Terms and whose courts hear disputes. Fill in before launch. */
export const GOVERNING_STATE = "[STATE]";

/** Where people send legal notices and questions about the Terms. */
export const CONTACT_EMAIL = ADMIN_EMAIL;

/**
 * Set when someone ticks the box on the sign-up form, so the account document created right after
 * sign-up records the acceptance. Kept in memory only: a person who signs up another way is asked on
 * their first visit instead.
 */
let pending: string | null = null;
export const markTermsAccepted = () => {
  pending = TERMS_VERSION;
};
export const takePendingAcceptance = (): string | null => {
  const v = pending;
  pending = null;
  return v;
};

/** Records on the person's account that they accepted the current Terms, with the server's time. */
export async function acceptTerms(uid: string): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, "accounts", uid), { termsVersion: TERMS_VERSION, termsAcceptedAt: serverTimestamp() });
}
