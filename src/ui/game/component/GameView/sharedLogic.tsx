export const sanitizeGameCode = (input: string): string =>
  input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase();
