export type FormValues = { name: string; email: string; message: string };
export type FormErrors = Partial<Record<keyof FormValues, string>>;
export type ContactStatus = { kind: 'idle' | 'pending' | 'success' | 'error'; message: string };
