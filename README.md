# EASprint

Timed practice for the IRS Special Enrollment Examination (SEE), the exam for becoming an Enrolled Agent. It covers all three parts, explains every answer, and links each explanation to its source on irs.gov.

EASprint is the sibling of MathSprint (`../mathsprint`) and keeps its stack, screens and timed-practice engine. It ships a hand-written question bank for all three parts, and, like MathSprint, signed-in candidates can build their own decks with Claude.

It is a study aid and is not affiliated with the IRS.

## What's in it

| Part | Domains (scored questions on the real exam) | Questions here |
| --- | --- | --- |
| 1: Individuals | Preliminary Work and Taxpayer Data (14), Income and Assets (17), Deductions and Credits (17), Taxation (15), Advising the Individual Taxpayer (11), Specialized Returns for Individuals (11) | 40 |
| 2: Businesses | Business Entities and Considerations (30), Business Tax Preparation (37), Specialized Returns and Taxpayers (18) | 40 |
| 3: Representation, Practices and Procedures | Practices and Procedures (26), Representation before the IRS (25), Specific Areas of Representation (20), Filing Process (14) | 40 |

Questions are written to tax law through December 31, 2025 (tax year 2025), which is what the July 2026 to February 2027 testing window covers. That includes the 2025 law changes: the $15,750 / $31,500 / $23,625 standard deduction, the $2,200 child tax credit, the $40,000 state and local tax limit, the new deduction for seniors, the $2,500,000 section 179 limit and the return of 100% bonus depreciation.

### Building a deck with Claude

From the home page a signed-in candidate describes a topic (for example "Head of household rules"), picks the exam part, number of questions and difficulty, and enters the access code. The `generate_deck` Cloud Function (`functions/`) then:

1. asks Claude for exam-style questions on tax law through December 31, 2025, each with three wrong options and why they're wrong, a three-part explanation, an exam domain and an irs.gov source;
2. checks each question's shape (four distinct options, a domain from the chosen part, a full explanation, an https://www.irs.gov/ source);
3. checks that every cited irs.gov page actually exists;
4. has a separate Claude call answer every question **without the key**. A question passes only if it picks the keyed answer and agrees exactly one option is right;
5. sends anything that failed back to Claude with the reason, up to two rounds, and leaves out whatever still fails;
6. saves the deck to Firestore, where it shows under "Your decks" and practices like the built-in parts.

Tax answers can't be solved by a math engine the way MathSprint's are, so the blind check is the closest equivalent. It catches wrong keys and ambiguous questions, but it isn't a guarantee, so the deck page reminds candidates to check figures against the linked source.

Building decks needs Firebase (it is hidden when the app runs without it).

### Screens

- **Home**: the three parts with your best score, overall progress and pace, and the exam domains you are weakest in.
- **Part review**: what the exam covers by domain, the questions (answers hidden), and the IRS sources cited.
- **Practice setup**: Learn (no clock), Practice (your own limit) or Exam pace (2:06 per question, which is 100 questions in 3.5 hours). Filter by domain, and take a random set, the outline order, the ones you haven't practiced, or the ones you missed last time.
- **Timed practice**: one question at a time with the pressure tint, target marker and pace chip from MathSprint. Any question can be revisited.
- **Results**: score, timing verdict, time per question against the target, and every question with the right answer, your answer, why each wrong option is wrong, a fuller explanation (the rule, how it applies, and an exam tip) and the IRS source.

## How it fits together

```text
React + TypeScript (Vite, Tailwind)
        │
        ├── web/src/data        the question bank, exam outline and IRS source list
        ├── web/src/lib         grading, pace, timing and insights (pure, tested)
        └── practice sessions   in this browser by default, or Firebase Auth + Firestore
```

With no Firebase config the app needs no account and keeps sessions in the browser's local storage. With Firebase config in `web/.env.local` it asks you to sign in and stores sessions in Firestore, so progress follows you across devices. `web/src/lib/db.ts` holds both stores behind one interface.

### Adding questions

Questions live in `web/src/data/part1.ts`, `part2.ts` and `part3.ts`. Each one is a call to the domain's writer:

```ts
d1(
  "M",                                   // E, M or H
  "Filing status",                       // topic chip
  "Question text…",
  "The right answer",                    // listed first; shuffled into a fixed position
  [
    ["Wrong option", "Why it is wrong"],
    ["Wrong option", "Why it is wrong"],
    ["Wrong option", "Why it is wrong"],
  ],
  "The rule.

How it applies to these facts, with the working.

Exam tip: …",
  "p501",                                // a key from data/sources.ts
  "Filing Status: Qualifying Surviving Spouse",   // where in that source
),
```

Because options are shuffled, don't write "all of the above" or "both A and B". Add new IRS sources to `web/src/data/sources.ts`. Separate explanation paragraphs with a blank line (`

`). `npm test` checks that every question has four distinct options, a full explanation, a reason for each wrong option and a source on irs.gov.

Dollar amounts change every year. When the exam moves to tax year 2026, search the data files for 2025 figures and update them from the new publications.

## Run it

You need Node 20 or later.

```bash
npm --prefix web install
npm --prefix web run dev
```

Then open the address Vite prints (http://localhost:5173 by default).

### Tests

```bash
npm --prefix web test                                      # grading, pace, timing and the question bank
functions/venv/Scripts/python -m pytest functions/tests    # the deck generator and its checks
```

### Optional: sync progress with Firebase

1. `.firebaserc` points at the `easprint-98625` project. Change it to use your own.
2. In the Firebase console, enable **Authentication** (Google and Email/Password) and create a **Firestore** database.
3. Copy `web/.env.example` to `web/.env.local` and fill in the web app config.
4. Store the Claude key and the access code people must enter to build a deck:
   ```bash
   firebase functions:secrets:set ANTHROPIC_API_KEY
   firebase functions:secrets:set DECK_ACCESS_CODE
   ```
   Cloud Functions needs the project on the Blaze plan.
5. Install the function's packages: `py -3.12 -m venv functions/venv` then `functions/venv/Scripts/pip install -r functions/requirements.txt` (on macOS or Linux, `functions/venv/bin/pip`).
6. `firebase deploy` publishes the site, the function, the Firestore rules and the indexes.

`firestore.rules` keeps every session private to its owner and makes finished sessions read-only.

## Not in this version

- The "I don't understand this" explainer from MathSprint.
- A full 100-question mock exam per part. The bank has 40 questions per part so far.
