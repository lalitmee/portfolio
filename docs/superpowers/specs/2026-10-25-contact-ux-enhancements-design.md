# Contact UX enhancements and Topmate integration

## Intent

Enhance the contact page user experience on the `feat/ui-revamp` branch by:
1. Providing live pending feedback on the submit button while message transmission is active.
2. Automatically resetting the form upon successful delivery and displaying an editorial-styled toast notification.
3. Integrating Topmate as a direct mentorship/booking channel in the contact sidebar with animated brand styling and analytics tracking.

## Scope

- **Contact Form UX (`components/Contact.tsx`):**
  - While submitting: Apply `.is-submitting` to the send button, trigger continuous flight motion on the paper plane, update label to "Sending…", and disable input.
  - On submission success: Automatically clear all form fields (`name`, `email`, `company`, `subject`, `message`), clear errors, and show an accessible, theme-aware toast notification.
  - Toast behavior: Fixed at bottom-right (`position: fixed`), displaying the animated `CheckIcon`, title "Message sent", description "Thank you for reaching out. I'll get back to you shortly.", and a dismiss button. Auto-dismisses after 5 seconds with timer cleanup.
  - Fallback: Preserve the existing error fallback (`mailto:` prefilled link) if sending fails or keys are missing.
- **Topmate Mentorship (`components/Contact.tsx`, `components/icons/AnimatedIcons.tsx`):**
  - Add Topmate link (`https://topmate.io/lalitmee`) to `<aside>` with visible label "Topmate".
  - Implement `TopmateIcon` in `AnimatedIcons.tsx` using `variant="brand"` to share the theme-aware highlight sweep animation on hover and focus.
  - Update `utils/analytics.ts` to allow `'topmate'` in `contact_click` events.
- **Styling (`styles/globals.css`):**
  - `.send-button.is-submitting .send-icon`: `animation: send-icon-flight 1600ms linear infinite`.
  - `.contact-toast`: Editorial styling with `var(--panel)` background, `var(--line)` border, subtle elevation, and responsive positioning.
  - Reduced-motion fallbacks: Disable flight loop and icon draw animations when `prefers-reduced-motion: reduce` is active.

## Architecture & Data Flow

```
[User Clicks "Send Message"]
           │
           ▼
[Validate Form] ──(invalid)──► Display inline field errors
           │
       (valid)
           │
           ▼
[Set `submitting: true`]
           │
           ├─► `.send-button.is-submitting` (plane flights continuously, label "Sending…")
           │
           ▼
[EmailJS `sendForm`]
      │          │
  (success)   (failure)
      │          │
      │          └─► Set inline status with mailto fallback
      ▼
[Reset Form Fields to empty]
[Set `submitting: false`]
[Trigger Toast Notification (auto-dismisses after 5s)]
```

## Detailed Component Specifications

### 1. `components/icons/AnimatedIcons.tsx`
Add `TopmateIcon`:
```tsx
export function TopmateIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="brand" {...props} stroke="none" fill="currentColor">
      {/* Topmate SVG shape wrapped in clipPath with brand-highlight */}
    </Icon>
  );
}
```

### 2. `utils/analytics.ts`
Extend `AnalyticsEvent`:
```ts
| { event: 'contact_click'; channel: 'email' | 'github' | 'linkedin' | 'topmate' }
```
And validate `item.channel` accordingly.

### 3. `components/Contact.tsx`
- State:
  - `toast: { id: number; message: string } | null`
  - Timer ref for cleanup on unmount.
- Successful submission handler:
  ```ts
  setValues(emptyForm);
  setErrors({});
  setToast({ id: Date.now(), message: 'Message sent' });
  ```
- Toast markup:
  ```tsx
  {toast && (
    <aside className="contact-toast" role="status" aria-live="polite">
      <CheckIcon className="toast-icon" aria-hidden="true" />
      <div className="toast-content">
        <p className="toast-title">Message sent</p>
        <p className="toast-body">Thank you for reaching out. I'll get back to you shortly.</p>
      </div>
      <button type="button" className="toast-dismiss" onClick={() => setToast(null)} aria-label="Dismiss notification">
        ✕
      </button>
    </aside>
  )}
  ```

### 4. Direct Reach Sidebar
Add Topmate anchor:
```tsx
<p>
  <a
    href="https://topmate.io/lalitmee"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent({ event: 'contact_click', channel: 'topmate' })}
  >
    <TopmateIcon aria-hidden="true" /> Topmate
  </a>
</p>
```

### 5. `styles/globals.css`
- Continuous plane animation during submission:
  ```css
  .send-button.is-submitting .send-icon {
    animation: send-icon-flight 1600ms linear infinite;
  }
  ```
- Reduced motion fallback:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .send-button.is-submitting .send-icon {
      animation: none !important;
    }
  }
  ```
- Toast styling:
  ```css
  .contact-toast {
    position: fixed;
    right: max(1.5rem, env(safe-area-inset-right));
    bottom: max(1.5rem, env(safe-area-inset-bottom));
    z-index: 60;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    max-width: min(calc(100vw - 2rem), 24rem);
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 0.375rem;
    color: var(--ink);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  ```

## Verification Plan

1. **Unit & Integration Tests:**
   - Update `tests/contact-links.test.cjs` to assert presence of Topmate link, label, and `icon-brand`.
   - Update `tests/analytics.test.cjs` to verify that `channel: 'topmate'` is accepted by `trackEvent` and correctly emitted to `dataLayer`.
   - Add test verifying `.send-button.is-submitting` CSS animation and reduced-motion reset in `styles/globals.css`.
   - Add test asserting toast accessibility (`role="status"`, `aria-live="polite"`).
2. **Regression Check:**
   - Run `yarn test` to ensure all 60 existing tests pass along with the new assertions.
3. **Build Check:**
   - Run `yarn build` to verify Next.js export and TypeScript compilation succeed without errors.
