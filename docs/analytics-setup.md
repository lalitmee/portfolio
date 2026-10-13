# Analytics setup and verification

Analytics is optional. The site loads one GTM container only after a visitor accepts; the container ID and GA4 measurement ID must both be valid `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA4_MEASUREMENT_ID` values. Missing or malformed values leave the site untracked. No credentials belong in the repository.

In GTM, create GA4 event tags for these custom-event names and map only the listed data-layer parameters:

| Event | Parameters |
| --- | --- |
| `page_view` | `page_path` |
| `case_study_view` | `case_slug` |
| `project_open` | `project_slug`, `destination_kind` |
| `resume_download` | none |
| `contact_click` | `channel` |
| `app_launch` | `app_slug` |

Use one custom-event trigger per event. On the GA4 configuration tag, disable automatic `page_view` (`send_page_view: false`). Disable enhanced-measurement page views and outbound-click collection so they cannot duplicate events or capture arbitrary URLs. Keep advertising storage, ad user data, and ad personalization denied. Do not add user IDs, form values, filenames, document text, raw URLs, query strings, or hashes as variables or parameters.

For the `page_view` tag, construct `page_location` from `https://www.lalitmee.com` plus the sanitized `page_path`; do not use the browser's raw location or referrer. For other events, use the current sanitized `page_path` data-layer value if a page location is required; omit referrer unless it is separately reduced to a same-site route path. Do not configure automatic link/form variables that send arbitrary destinations.

Validate with GTM Preview and GA4 DebugView after setting real IDs in a local environment. Confirm no GTM/Google measurement request occurs before consent, after decline, or after withdrawal; confirm one page view on initial accepted entry and each completed route change (not hash changes or rerenders); and check the exact parameter allowlist. Local data-layer tests do not prove live delivery. This repository does not have GTM container access, so live delivery and tag configuration remain unverified.

The `app_launch` event records a click on the app link, not meaningful first use or repeat use inside the separately hosted Markdown Previewer. Measuring app use requires instrumentation in that upstream application.
