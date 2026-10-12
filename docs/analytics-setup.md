# Analytics setup

Analytics is optional and consent-gated. Set the public build variables
`NEXT_PUBLIC_GTM_ID` (`GTM-…`) and `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (`G-…`)
to valid IDs before deploying. If either is absent or malformed, the site adds
no Google tag and emits no events. Consent is stored as
`portfolio-analytics-consent`; blocked storage falls back to an in-memory
choice for the current page session.

## Configure the GTM container

1. Add a Google tag for the GA4 measurement ID. Keep its automatic page view
   disabled (`send_page_view: false`); this site emits route views itself.
2. Disable Enhanced Measurement page views/history changes and automatic
   outbound-click collection. Do not add tags that collect form values,
   contact details, typed text, or Markdown contents.
3. Add a GA4 Event tag for each event below, triggered by its matching GTM
   Custom Event. Map only the listed event parameters.
4. Build `page_location` from the canonical site origin and normalized
    `page_path`; omit query strings and fragments. Send a sanitized `page_referrer`
    containing only the same-site origin and path (or the external origin only),
    never its query or fragment.
5. Keep advertising-related consent denied. The implementation grants only
   `analytics_storage` after acceptance, loads one GTM script after opt-in, and
   sends no pre-consent events. On withdrawal it disables the configured GA4
    measurement ID, denies analytics consent, clears accessible `_ga` cookies,
    and drops queued custom events.

Create GTM Custom JavaScript variables for the sanitized URL values and map
them to the corresponding Google tag fields on the event tags:

```javascript
// Sanitized Page Location
function () {
  return window.location.origin + window.location.pathname;
}

// Sanitized Page Referrer
function () {
  try {
    var referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin
      ? referrer.origin + referrer.pathname
      : referrer.origin;
  } catch (error) {
    return undefined;
  }
}
```

## Event contract

| Event | Allowed parameters |
| --- | --- |
| `page_view` | `page_path` |
| `case_study_view` | `case_slug` |
| `project_open` | `project_slug`, `destination_kind` (`source`, `demo`, `detail`) |
| `resume_download` | none |
| `contact_click` | `channel` (`email`, `github`, `linkedin`) |
| `app_launch` | `app_slug` |

The runtime reconstructs event objects from this allowlist; extra fields are
discarded. Do not enable automatic events that expand it. The Markdown app is
hosted separately, so `app_launch` means only that someone opened its route; it
is **not** evidence of first use or repeat use. If app engagement is later
needed, instrument the app separately with consent-aware `app_first_use` and
repeat-use events that do not include file names or document contents.

## Validation

Use GTM Preview to check that the container and each Custom Event trigger fire
only after acceptance. In GA4 DebugView, verify one `page_view` per initial
accepted view and completed route navigation (including revisits), plus the
listed interaction events. Test accept, decline, and withdrawal from
`/privacy/`; inspect requests and `dataLayer` for absent pre-consent events,
personal data, query strings, and post-withdrawal measurement.

Cookie deletion is best-effort: browser script access cannot remove HttpOnly
cookies or cookies on domains/paths the page cannot address. Clearing site data
in browser settings remains available. Live GTM Preview and GA4 DebugView
require valid deployment IDs and container access; local tests do not verify
Google's upstream delivery.
