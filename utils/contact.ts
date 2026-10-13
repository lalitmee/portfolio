export interface ContactFields {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface EmailJsConfig {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
}

export async function deliverContactMessage(
  fields: ContactFields,
  config: EmailJsConfig,
  send: (fields: ContactFields, config: Required<EmailJsConfig>) => Promise<unknown>,
): Promise<'sent' | 'not-configured' | 'failed'> {
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    return 'not-configured';
  }

  try {
    await send(fields, config as Required<EmailJsConfig>);
    return 'sent';
  } catch {
    return 'failed';
  }
}
