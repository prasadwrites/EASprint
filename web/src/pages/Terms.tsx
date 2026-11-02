import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Brand } from "../components/TopBar";
import { CONTACT_EMAIL, GOVERNING_STATE, TERMS_EFFECTIVE } from "../lib/terms";

// TEMPLATE: general-purpose terms for a US online study service. Not legal advice. Have a lawyer review
// this text. Governing law (Texas) is set by GOVERNING_STATE in lib/terms.ts. When you change the wording, bump TERMS_VERSION
// there so everyone is asked to accept the new version.

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="stack" style={{ gap: 8 }}>
      <h2 style={{ fontSize: 20 }}>
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

/** The full Terms of Use and disclaimers. */
export function TermsText() {
  return (
    <div className="stack terms">
      <p>
        These Terms of Use (the "Terms") are a binding agreement between you and the owners and operators of EASprint ("EASprint," "we," "us," or "our"), and
        govern your use of the EASprint website at EASprint.com, its apps and related services (together, the "Service"). By creating an account, checking the
        box to accept these Terms, or using the Service, you agree to these Terms. If you do not agree, do not create an account or use the Service.
      </p>

      <Section n={1} title="Not affiliated with the IRS or any government agency">
        <p>
          EASprint is an independent, privately operated study aid. It is not affiliated with, endorsed by, sponsored by, or approved by the Internal Revenue
          Service (IRS), the U.S. Department of the Treasury, the Return Preparer Office, Prometric, or any other government agency or exam provider.
          "Enrolled Agent," "Special Enrollment Examination," "SEE," and "IRS" are used only to describe the exam the Service helps you study for. Links to
          irs.gov or other third-party sites are provided for convenience; we do not control and are not responsible for their content.
        </p>
      </Section>

      <Section n={2} title="Educational use only; not tax, legal, or financial advice">
        <p>
          All content on the Service, including practice questions, answers, explanations, exam tips, scores, insights, and decks generated with artificial
          intelligence, is provided for general educational and exam-preparation purposes only. It is <b>not</b> tax, legal, accounting, financial, or other
          professional advice, and no professional–client, attorney–client, or practitioner–client relationship is created by your use of the Service. Do not
          rely on the Service to prepare any tax return, take any tax position, advise any client, or make any decision. Consult the official IRS publications
          and a qualified professional for advice about your specific situation.
        </p>
      </Section>

      <Section n={3} title="Accuracy of content">
        <p>
          Tax law, IRS guidance, dollar thresholds, and exam content outlines change frequently. While we try to keep the Service accurate and up to date, the
          content may contain errors, omissions, or outdated information, and questions generated with artificial intelligence may be incorrect. Always verify
          any figure or rule against the current official IRS source. We do not guarantee that the Service's content matches the questions, format, or scope of
          any actual examination.
        </p>
      </Section>

      <Section n={4} title="No guarantee of exam results">
        <p>
          We do not guarantee, promise, or represent that using the Service will result in your passing any part of the Special Enrollment Examination or any
          other exam, earning any credential, or achieving any score. Practice scores, pass-likelihood estimates, and readiness indicators are informal estimates
          only. Your results depend on your own preparation and many factors outside our control.
        </p>
      </Section>

      <Section n={5} title="Eligibility and your account">
        <p>
          You must be at least 18 years old, or the age of majority where you live, to create an account. You agree to give accurate information, to keep your
          sign-in credentials secure, and that you are responsible for all activity under your account. Tell us promptly at {CONTACT_EMAIL} if you suspect
          unauthorized use. One account per person; accounts and access codes may not be shared, sold, or transferred.
        </p>
      </Section>

      <Section n={6} title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>copy, scrape, resell, redistribute, or publish the Service's questions or content, except for your own personal study;</li>
          <li>share, post, or solicit actual exam questions, or use the Service in any way that violates exam confidentiality or candidate agreements;</li>
          <li>interfere with, probe, overload, or attempt to gain unauthorized access to the Service, other accounts, or our systems;</li>
          <li>use the Service for any unlawful purpose or in violation of these Terms.</li>
        </ul>
        <p>We may suspend or terminate any account, at our discretion and without notice, if we believe these Terms have been violated.</p>
      </Section>

      <Section n={7} title="Intellectual property">
        <p>
          The Service and its content, software, design, and branding are owned by EASprint or its licensors and are protected by U.S. and international
          intellectual property laws. We grant you a limited, personal, non-exclusive, non-transferable, revocable license to use the Service for your own
          non-commercial exam preparation, subject to these Terms. Official IRS materials that are in the public domain remain so. Content you submit (such as
          deck names) remains yours, and you grant us a license to store and process it to operate the Service.
        </p>
      </Section>

      <Section n={8} title="Paid plans">
        <p>
          Some features require a paid plan. Prices and plan limits are shown before you pay. Payments are processed by a third-party payment processor, and we
          do not store your full card details. Except where required by law, fees are non-refundable, and we may change prices or plan features going forward
          with notice on the Service.
        </p>
      </Section>

      <Section n={9} title="Disclaimer of warranties">
        <p className="caps">
          The Service and all content are provided "as is" and "as available," without warranties of any kind, whether express, implied, or statutory, including
          any implied warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, and any warranties arising from course
          of dealing or usage of trade. We do not warrant that the Service will be uninterrupted, secure, error-free, or free of harmful components, or that any
          content is accurate, complete, or current. Some jurisdictions do not allow the exclusion of certain warranties, so some of these exclusions may not
          apply to you.
        </p>
      </Section>

      <Section n={10} title="Limitation of liability">
        <p className="caps">
          To the fullest extent permitted by law, EASprint and its owners, operators, members, employees, contractors, and agents will not be liable for any
          indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, goodwill, exam fees,
          professional opportunities, or tax penalties or interest, arising out of or related to the Service or these Terms, however caused and under any theory
          of liability, even if advised of the possibility of such damages. Our total liability for all claims arising out of or related to the Service or these
          Terms will not exceed the greater of (a) the amount you paid us in the twelve (12) months before the claim arose, or (b) fifty U.S. dollars (US$50).
          Some jurisdictions do not allow these limitations, so they may not fully apply to you.
        </p>
      </Section>

      <Section n={11} title="Indemnification">
        <p>
          You agree to defend, indemnify, and hold harmless EASprint and its owners, operators, members, employees, contractors, and agents from and against any
          claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or related to your use or misuse of the
          Service, your violation of these Terms, or your violation of any law or the rights of any third party.
        </p>
      </Section>

      <Section n={12} title="Governing law and disputes">
        <p>
          These Terms are governed by the laws of {GOVERNING_STATE} and applicable U.S. federal law, without regard to conflict-of-law rules. Any dispute arising
          out of or related to these Terms or the Service will be brought only in the state or federal courts located in {GOVERNING_STATE}, and you and we
          consent to their personal jurisdiction. To the extent permitted by law, any claim must be brought within one (1) year after it arises, and claims may be
          brought only on an individual basis and not as a plaintiff or class member in any class or representative action.
        </p>
      </Section>

      <Section n={13} title="Changes, termination, and general terms">
        <p>
          We may update these Terms from time to time. When we make material changes, we will ask you to accept the new Terms before you continue using the
          Service. You may stop using the Service and ask us to close your account at any time. We may modify, suspend, or discontinue the Service at any time.
          Sections that by their nature should survive termination (including 2–4 and 9–13) will survive. If any provision is found unenforceable, the rest
          remains in effect. Our failure to enforce a provision is not a waiver. These Terms are the entire agreement between you and us about the Service, and
          you may not assign them without our consent.
        </p>
      </Section>

      <Section n={14} title="Contact">
        <p>Questions or legal notices about these Terms: {CONTACT_EMAIL}.</p>
      </Section>
    </div>
  );
}

export default function Terms() {
  return (
    <div className="wrap">
      <div className="stack">
        <div className="topbar">
          <Brand />
          <Link to="/">Back to EASprint</Link>
        </div>
        <h1>Terms of Use and Disclaimer</h1>
        <p className="muted">Effective {TERMS_EFFECTIVE}</p>
        <TermsText />
      </div>
    </div>
  );
}
