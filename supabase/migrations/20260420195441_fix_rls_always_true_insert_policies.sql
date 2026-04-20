/*
  # Fix RLS INSERT policies with always-true WITH CHECK clauses

  ## Problem
  Three tables had INSERT policies whose WITH CHECK clause evaluated to a literal
  `true`, granting unrestricted write access to the anon role with no validation
  whatsoever. Any anonymous client could insert arbitrary rows.

  ## Tables affected
  - `public.calculator_interactions`
  - `public.monument_scores`
  - `public.triage_events`

  ## Changes

  ### calculator_interactions
  - DROP the "Anon can insert calculator interactions" policy (WITH CHECK true).
  - No replacement required: the existing "Anon can insert calculator interaction
    with valid session" policy already covers anon + authenticated with a proper
    check: `length(trim(session_id)) > 0`.

  ### monument_scores
  - DROP the "Anon can insert monument scores" policy (WITH CHECK true).
  - CREATE replacement restricted to anon, requiring a non-empty session_id,
    a non-negative score, and a non-negative monthly_bleed_estimate.

  ### triage_events
  - DROP the "Anon can insert triage events" policy (WITH CHECK true).
  - CREATE replacement restricted to anon, requiring non-empty session_id,
    enquiry_channel, and intent_detected fields.

  ## Security posture after migration
  All three tables continue to accept anonymous inserts, but only when the
  submitted row satisfies minimum field-presence / sanity checks. Arbitrary
  or empty payloads are rejected at the policy layer before touching storage.
*/

-- ─── calculator_interactions ───────────────────────────────────────────────
-- The always-true policy is superseded by the valid-session policy that
-- already exists. Drop only — no new policy needed.
DROP POLICY IF EXISTS "Anon can insert calculator interactions"
  ON public.calculator_interactions;


-- ─── monument_scores ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anon can insert monument scores"
  ON public.monument_scores;

CREATE POLICY "Anon can insert monument scores with valid session"
  ON public.monument_scores
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(session_id)) > 0
    AND score >= 0
    AND monthly_bleed_estimate >= 0
  );


-- ─── triage_events ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anon can insert triage events"
  ON public.triage_events;

CREATE POLICY "Anon can insert triage events with valid session"
  ON public.triage_events
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(session_id)) > 0
    AND length(trim(enquiry_channel)) > 0
    AND length(trim(intent_detected)) > 0
  );
