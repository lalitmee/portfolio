# Release checklist

## Release gate — required

**Status: BLOCKED until every checkbox below is complete and the release owner
records sign-off.** Missing configuration, failed delivery, or missing evidence
blocks release. Passing local tests alone does not clear this gate.

This is a manual release gate, not an automated CI or Vercel deployment block.
Complete pre-release checks before production rollout; production smoke checks
must pass before declaring the release complete. If they fail, stop the rollout
and restore the last known-good deployment through the approved release process.

Copy this checklist into the release PR or release record for each release.
Record evidence without credentials, contact messages, or personal data.

## 1. Vercel environment configuration

In the intended Vercel project's environment variable settings:

- [ ] Set `NEXT_PUBLIC_EMAILJS_SERVICE_ID` for Production.
- [ ] Set `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` for Production.
- [ ] Set `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` for Production.
- [ ] Set `NEXT_PUBLIC_GTM_ID` for Production to the intended GTM container ID.
- [ ] Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` for Production to the intended GA4 web
      stream measurement ID.
- [ ] Configure Preview separately for release-candidate testing. Use test
      analytics resources where possible so preview traffic does not pollute
      production reports; verify any branch-specific overrides.
- [ ] Build a new deployment after setting or changing variables. Existing
      deployments do not pick up environment changes; browser-facing values are
      embedded at build time.

GTM and GA4 values are public identifiers, not API secrets. The EmailJS public
key is intentionally browser-visible. Never put an EmailJS private key, Google
API secret, access token, or other secret in any `NEXT_PUBLIC_*` variable or
release evidence. Do not rely on the code's fallback analytics IDs as proof
that the intended deployment is configured.

## 2. GTM and GA4 setup

Follow [Analytics setup](analytics-setup.md) for the exact event contract.

- [ ] Confirm ownership/access to the intended GTM container and GA4 property;
      confirm the Google tag uses the same measurement ID as Vercel.
- [ ] Configure the Google tag and GA4 Event tags with matching Custom Event
      triggers and only the documented parameters. A reachable empty container
      does not pass.
- [ ] Disable automatic page views/history tracking and outbound-click
      collection as documented; configure sanitized URLs/referrers and keep
      advertising consent denied. Do not collect form values or contact details.
- [ ] Verify the candidate configuration using GTM Preview and GA4 DebugView,
      then publish the intended container version. Preview-only changes do not pass.
- [ ] Confirm no Google analytics requests before consent or after declining.
- [ ] After acceptance, verify one `page_view` per initial view and completed
      route navigation, plus `case_study_view`, `project_open`, `resume_download`,
      `contact_click`, and `app_launch` for the corresponding interactions.
- [ ] Withdraw consent on `/privacy/` and verify subsequent interactions stop
      measurement; confirm payloads contain no personal data, query strings, or
      fragments.

## 3. EmailJS setup and delivery

- [ ] Confirm the EmailJS service is connected and authorized, the template
      exists, and the configured account has available sending quota.
- [ ] Confirm the template maps `name`, `email`, `subject` (or the supplied
      `title` alias), and `message`; map optional `company` if it should be included.
      Verify the destination inbox and Reply-To configuration.
- [ ] Review EmailJS origin restrictions and abuse protections; allow the
      production domain and any explicitly approved preview origin used for testing.
- [ ] Submit one clearly labelled test message from the release candidate with
      an approved test sender. Verify the message actually arrives with the expected
      fields and Reply-To. A success banner alone does not pass.
- [ ] Verify invalid input does not submit. Simulate a failed request locally
      in the browser and confirm the message remains available with the email
      fallback; do not break shared service configuration to test failure.

## 4. Build and production smoke checks

- [ ] `npm test` passes.
- [ ] `npm run type-check` passes.
- [ ] `npm run build` passes with the intended deployment configuration.
- [ ] On the production domain, repeat the approved EmailJS delivery check and
      verify the published GTM container sends consented events to the intended GA4
      property, with no duplicate page views. Preview success alone does not pass.

## 5. Release sign-off

- [ ] Record all required evidence below and mark the release approved only
      after every preceding check passes.

- Release owner: pending
- Commit SHA and release-candidate deployment URL: pending
- Production deployment URL and verification time (UTC): pending
- Published GTM container version and GA4 verification evidence: pending
- EmailJS delivery confirmation time and redacted evidence: pending
- Test, type-check, and build results: pending
- Final decision: **BLOCKED / APPROVED** (select one)

Reference: [Vercel environment variables](https://vercel.com/docs/environment-variables).
