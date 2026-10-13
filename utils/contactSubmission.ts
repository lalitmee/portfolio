export async function submitContactForm(
  form: { reset(): void },
  send: () => Promise<unknown>,
): Promise<boolean> {
  try {
    await send();
    form.reset();
    return true;
  } catch {
    return false;
  }
}
