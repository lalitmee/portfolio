# Editorial portfolio redesign

Ongoing repo-specific redesign of `lalitmee.com` in the `feat/ui-revamp` worktree.

- Approved design: `docs/superpowers/specs/2026-10-13-editorial-workshop-design.md`
- Approved implementation plan: `docs/superpowers/plans/2026-10-13-editorial-workshop.md`
- Execution ledger: `.superpowers/sdd/2026-10-13-editorial-workshop/progress.md` (git-ignored working record)
- Scope: Editorial Workshop only; no deployment or changes to sibling design worktrees.
- Evidence boundary: site copy uses résumé and inspected repository evidence; omit unsupported metrics and placeholder testimonials. The résumé PDF remains unchanged.
- Contact delivery uses EmailJS only when configured; validation/config/send failures keep entered values and offer a prefilled email fallback. A controlled rejection test used dummy build-time IDs and blocked XHR. One later exploratory local submit unexpectedly found EmailJS configuration embedded in that build; EmailJS returned HTTP 400 and further submits stopped. No successful delivery was observed. The final blank-config test confirmed the fallback without a network request.
- Analytics lifecycle was tested locally with disposable GTM/GA4 IDs and an intercepted loader; no pre-consent or post-withdraw custom events were emitted. One later stored-consent test reload lost the interception and fetched only the dummy `GTM-TEST123` script (HTTP 200); no GA collection request was observed, and the page was immediately navigated to `about:blank`. No production analytics IDs were used. See Task 4 ledger entries for the full boundary.

Current execution status is recorded in the ledger and task commits.
