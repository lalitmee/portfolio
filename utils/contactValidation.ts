export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateContactForm(
  fields: ContactFields,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!fields.name.trim()) errors.name = 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if (!fields.subject.trim()) errors.subject = 'Subject is required';
  if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}
