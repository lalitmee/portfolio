# Analytics setup

The portfolio sends nothing to Google until the visitor accepts analytics. There is no pre-consent tracker or noscript fallback. The consent choice is stored as `portfolio-analytics-consent`; if browser storage is blocked, the choice works for the current page session only.

## Configure

Set these public build-time variables only when a real container and property are ready:

- `NEXT_PUBLIC_GTM_ID`: a Google Tag Manager ID matching `GTM-` followed by seven uppercase letters or digits.
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`: a GA4 measurement ID matching `G-` followed by ten uppercase letters or digits.

Both values are required. The portfolio validates their formats, injects one GTM script after acceptance, and queues only the allowlisted events in `utils/analytics.ts`.

In GTM, create a GA4 configuration/event setup for the custom `page_view` event and the portfolio event names (`case_study_view`, `project_open`, `resume_download`, `contact_click`, `app_launch`). Use the supplied `page_path` as the route. Construct `page_location` from the canonical site origin plus that path; do not forward query strings, fragments, email addresses, or arbitrary link parameters. Leave `page_referrer` unset or reduce it to the site origin.

Disable GA4 automatic page views, enhanced measurement page views, outbound-click tracking, and other automatic collection that could bypass the allowlist. Do not configure advertising tags or advertising consent. The app demo does not emit a demo event; `app_launch` records only the explicit launch link. Actual first/repeat use inside the separately hosted Markdown Previewer requires separate upstream instrumentation and consent work.

## Verify a configured container

Use GTM Preview and GA4 DebugView with a test browser. Check that no Google request or script occurs before acceptance, that a single initial view and each completed non-hash route transition are counted, and that the event payload contains only allowlisted fields. Check decline and withdrawal, including after the script has loaded. The portfolio disables GA measurement, removes its script, drops queued custom events, and expires accessible analytics cookies on relevant paths/domains; it cannot erase data already received by Google or cookies inaccessible to this origin.

No live container/property is configured in this worktree, so delivery to Google and GTM Preview/DebugView behavior are not verified here.
