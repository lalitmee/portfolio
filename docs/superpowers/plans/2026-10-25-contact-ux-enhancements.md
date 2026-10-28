# Contact UX Enhancements and Topmate Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Provide an active flight animation on the contact send button during submission, automatically reset the form and show an editorial toast notification on success, and add Topmate with brand animation and analytics to the direct channels list.

**Architecture:** Extend `AnimatedIcons.tsx` with `TopmateIcon` sharing the brand-sweep animation; update `utils/analytics.ts` to allow `'topmate'` in `contact_click` events; enhance `styles/globals.css` with `.send-button.is-submitting` looping motion and editorial `.contact-toast` styling; update `components/Contact.tsx` to handle auto-reset, pending state, toast display, and Topmate link.

**Tech Stack:** Next.js (pages router), React 19, TypeScript, Tailwind CSS / vanilla CSS custom properties, Node test runner (`node:test`).

## Global Constraints

- Never commit or push without separate, explicit user approval (User Hard Rule 2).
- EmailJS template field names (`name`, `email`, `subject`, `company`, `message`, and hidden `title`) must be preserved.
- Form validation rules in `utils/contactForm.ts` must remain intact.
- Reduced-motion fallbacks (`prefers-reduced-motion: reduce`) must be strictly maintained for all animations.
- All 60 existing tests must pass without regressions.

---

### Task 1: Topmate Icon & Analytics Channel Extension

**Files:**
- Modify: `components/icons/AnimatedIcons.tsx`
- Modify: `utils/analytics.ts`
- Test: `tests/analytics.test.cjs`

**Interfaces:**
- Consumes: `IconProps`, `Icon` from `components/icons/AnimatedIcons.tsx`
- Produces: `TopmateIcon` export from `components/icons/AnimatedIcons.tsx`; `'topmate'` allowed in `AnalyticsEvent` `{ event: 'contact_click', channel: 'topmate' }` in `utils/analytics.ts`.

- [x] **Step 1: Write failing analytics test for `'topmate'` channel**

In `tests/analytics.test.cjs`, add an assertion in the allowlisted channels test that `channel: 'topmate'` is accepted by `trackEvent` and verified on the dataLayer:

```javascript
  assert.equal(
    analytics.trackEvent({
      event: 'contact_click',
      channel: 'topmate',
    }),
    true,
  );
  assert.deepEqual(layer, [
    { event: 'contact_click', channel: 'email' },
    { event: 'contact_click', channel: 'topmate' },
  ]);
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --require ./tests/register.cjs --test tests/analytics.test.cjs`
Expected: FAIL because `'topmate'` is rejected by `trackEvent`.

- [x] **Step 3: Update `utils/analytics.ts` and `components/icons/AnimatedIcons.tsx`**

In `utils/analytics.ts`:
1. Update `AnalyticsEvent` union:
```typescript
  | {
      event: 'contact_click';
      channel: 'email' | 'github' | 'linkedin' | 'topmate';
    }
```
2. Update validation check in `trackEvent`:
```typescript
    case 'contact_click':
      if (!['email', 'github', 'linkedin', 'topmate'].includes(item.channel))
        return false;
      payload = { event: item.event, channel: item.channel };
      break;
```

In `components/icons/AnimatedIcons.tsx`:
Add and export `TopmateIcon`:
```tsx
export function TopmateIcon(props: IconProps): JSX.Element {
  const id = `brand-${useId()}`;
  const shape = (
    <g transform="translate(0.5 0.5) scale(0.5)">
      <circle
        r="22.5"
        transform="matrix(1 0 0 -1 23.5 23)"
        fill="currentColor"
      />
      <path
        d="M33.0038 29.6411C31.5707 31.6672 29.5206 33.1752 27.1598 33.9401C24.7989 34.705 22.254 34.6857 19.905 33.8851C17.5561 33.0844 15.5291 31.5454 14.1269 29.4978C12.7247 27.4503 12.0225 25.0041 12.1251 22.5246C12.2277 20.045 13.1296 17.6652 14.6962 15.7405C16.2627 13.8158 18.4099 12.4495 20.817 11.8456C23.224 11.2418 25.7619 11.4328 28.0515 12.3901C30.341 13.3474 32.2595 15.0197 33.5204 17.1572L23.6152 23L33.0038 29.6411Z"
        fill="var(--paper)"
      />
    </g>
  );
  return (
    <Icon variant="brand" {...props} stroke="none" fill="currentColor">
      <defs>
        <clipPath id={id}>{shape}</clipPath>
      </defs>
      {shape}
      <g clipPath={`url(#${id})`}>
        <path
          className="icon-detail brand-highlight"
          d="M-20 0L-15 0L-3 24L-8 24Z"
          stroke="var(--paper)"
          strokeWidth="3"
        />
      </g>
    </Icon>
  );
}
```

- [x] **Step 4: Run test to verify it passes**

Run: `node --require ./tests/register.cjs --test tests/analytics.test.cjs`
Expected: PASS.

---

### Task 2: CSS Styles for Button Pending State and Toast Notification

**Files:**
- Modify: `styles/globals.css`
- Test: `tests/contact-links.test.cjs`

**Interfaces:**
- Consumes: CSS variables `--paper`, `--panel`, `--line`, `--ink`, `--muted`, `--blue`
- Produces: `.send-button.is-submitting` animation and `.contact-toast` layout styles.

- [x] **Step 1: Write failing test in `tests/contact-links.test.cjs`**

In `tests/contact-links.test.cjs`, add tests checking that:
1. `.send-button.is-submitting .send-icon` has `animation: send-icon-flight 1600ms linear infinite` in `styles/globals.css`.
2. Reduced motion disables `.send-button.is-submitting .send-icon`.
3. `.contact-toast` CSS exists with fixed position and z-index >= 60.

```javascript
test('send button animates continuously while submitting with reduced motion override', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(
    css,
    /\.send-button\.is-submitting\s+\.send-icon\s*\{[^}]*animation:\s*send-icon-flight 1600ms linear infinite/s,
  );
  const reduced = css.slice(
    css.lastIndexOf('@media (prefers-reduced-motion: reduce)'),
  );
  assert.match(
    reduced,
    /\.send-button\.is-submitting\s+\.send-icon[\s\S]*?animation:\s*none !important/,
  );
});

test('contact toast styles are defined with accessible positioning and theme tokens', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(css, /\.contact-toast\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.contact-toast\s*\{[^}]*z-index:\s*60/s);
  assert.match(css, /\.contact-toast\s*\{[^}]*background:\s*var\(--panel\)/s);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --require ./tests/register.cjs --test tests/contact-links.test.cjs`
Expected: FAIL because CSS rules do not exist yet.

- [x] **Step 3: Add CSS rules to `styles/globals.css`**

In `styles/globals.css`:
1. Add `.send-button.is-submitting`:
```css
.send-button.is-submitting .send-icon {
  animation: send-icon-flight 1600ms linear infinite;
}
.send-button.is-submitting .send-label {
  opacity: 0.85;
}
```
2. Under `@media (prefers-reduced-motion: reduce)`:
```css
  .send-button.is-submitting .send-icon {
    animation: none !important;
  }
```
3. Add toast styling:
```css
.contact-toast {
  position: fixed;
  right: max(1.5rem, env(safe-area-inset-right));
  bottom: max(1.5rem, env(safe-area-inset-bottom));
  z-index: 60;
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  width: min(calc(100vw - 2rem), 24rem);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 0.375rem;
  color: var(--ink);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: toast-enter 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-toast .toast-icon {
  flex: none;
  font-size: 1.25rem;
  color: var(--blue);
  margin-top: 0.125rem;
}

.contact-toast .toast-content {
  flex: 1 1 auto;
  min-width: 0;
}

.contact-toast .toast-title {
  margin: 0 0 0.2rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink);
}

.contact-toast .toast-body {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--muted);
}

.contact-toast .toast-dismiss {
  flex: none;
  border: 0;
  background: transparent;
  padding: 0.2rem 0.4rem;
  margin: -0.25rem -0.5rem 0 0;
  font-size: 1.1rem;
  line-height: 1;
  color: var(--muted);
  cursor: pointer;
  border-radius: 0.25rem;
}

.contact-toast .toast-dismiss:hover,
.contact-toast .toast-dismiss:focus-visible {
  color: var(--ink);
  background: var(--line);
}
```

- [x] **Step 4: Run test to verify it passes**

Run: `node --require ./tests/register.cjs --test tests/contact-links.test.cjs`
Expected: PASS.

---

### Task 3: Contact Component Updates (Auto-Reset, Toast, Topmate Link)

**Files:**
- Modify: `components/Contact.tsx`
- Test: `tests/contact-links.test.cjs`

**Interfaces:**
- Consumes: `TopmateIcon`, `CheckIcon` from `components/icons/AnimatedIcons.tsx`
- Produces: Updated `Contact` component rendering Topmate in `<aside>`, `.is-submitting` on the send button, automatic form reset on EmailJS success, and toast notification.

- [x] **Step 1: Write failing test in `tests/contact-links.test.cjs`**

In `tests/contact-links.test.cjs`:
Update the `direct contact destinations keep labels and decorative internal-motion icons` test to also check for:
`['https://topmate.io/lalitmee', 'Topmate', 'brand']`.

- [x] **Step 2: Run test to verify it fails**

Run: `node --require ./tests/register.cjs --test tests/contact-links.test.cjs`
Expected: FAIL because Topmate link is not in `components/Contact.tsx`.

- [x] **Step 3: Implement changes in `components/Contact.tsx`**

1. Imports:
   Import `TopmateIcon` and `CheckIcon` from `./icons/AnimatedIcons`.
2. State:
   Add `toast` state:
   ```tsx
   const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
   const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
   ```
3. Lifecycle cleanup for toast timeout:
   ```tsx
   useEffect(() => {
     return () => {
       if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
     };
   }, []);
   ```
4. Update `handleSubmit`:
   ```tsx
   try {
     await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
     setValues(emptyForm);
     setErrors({});
     if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
     setToast({ id: Date.now(), message: 'Message sent' });
     toastTimeoutRef.current = setTimeout(() => {
       setToast(null);
     }, 5000);
   } catch {
     setStatus(
       'The message could not be sent. Your message is still here; you can email me instead.',
     );
   } finally {
     setSubmitting(false);
   }
   ```
5. Update send button markup:
   ```tsx
   <button
     className={`button button-primary send-button ${submitting ? 'is-submitting' : ''}`.trim()}
     type="submit"
     disabled={submitting}
   >
     <span className="send-label">
       {submitting ? 'Sending…' : 'Send message'}
     </span>
     <span className="send-icon" aria-hidden="true">
       <SendIcon className="send-plane" />
     </span>
   </button>
   ```
6. Add toast markup below the form:
   ```tsx
   {toast && (
     <aside className="contact-toast" role="status" aria-live="polite">
       <CheckIcon className="toast-icon" aria-hidden="true" />
       <div className="toast-content">
         <p className="toast-title">Message sent</p>
         <p className="toast-body">
           Thank you for reaching out. I'll get back to you shortly.
         </p>
       </div>
       <button
         type="button"
         className="toast-dismiss"
         onClick={() => setToast(null)}
         aria-label="Dismiss notification"
       >
         ✕
       </button>
     </aside>
   )}
   ```
7. Add Topmate link to `<aside>`:
   ```tsx
   <p>
     <a
       href="https://topmate.io/lalitmee"
       target="_blank"
       rel="noopener noreferrer"
       onClick={() =>
         trackEvent({ event: 'contact_click', channel: 'topmate' })
       }
     >
       <TopmateIcon aria-hidden="true" /> Topmate
     </a>
   </p>
   ```

- [x] **Step 4: Run tests to verify all tests pass**

Run: `node --require ./tests/register.cjs --test tests/contact-links.test.cjs`
Expected: PASS.

---

### Task 4: Full Suite Regression Verification and Build Check

**Files:**
- Test: All tests in `tests/*.test.cjs`

- [x] **Step 1: Run full test suite**

Run: `yarn test`
Expected: PASS (all 60+ tests passing).

- [x] **Step 2: Run build check**

Run: `yarn build`
Expected: Clean build with 0 TypeScript and ESLint errors.

- [x] **Step 3: Review changes with git diff**

Run: `git diff --stat`
Expected: Clean diff affecting only the intended files.
