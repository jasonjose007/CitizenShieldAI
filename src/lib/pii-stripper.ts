export interface PiiResult {
  cleaned: string;
  replacements: Map<string, string>;
}

const PHONE_PATTERN = /(?:\+91[\s-]?)?(?:\d[\s-]?){10}/g;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const AADHAAR_PATTERN = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
const PAN_PATTERN = /\b[A-Z]{5}\d{4}[A-Z]\b/g;
const PINCODE_PATTERN = /\b\d{6}\b/g;
const ACCOUNT_PATTERN = /\b\d{9,18}\b/g;
const IFSC_PATTERN = /\b[A-Z]{4}0[A-Z0-9]{6}\b/g;

export function stripPii(text: string): PiiResult {
  const replacements = new Map<string, string>();
  let cleaned = text;
  let counter = { phone: 0, email: 0, aadhaar: 0, pan: 0, account: 0, ifsc: 0 };

  cleaned = cleaned.replace(AADHAAR_PATTERN, (match) => {
    const placeholder = `[AADHAAR_${++counter.aadhaar}]`;
    replacements.set(placeholder, match);
    return placeholder;
  });

  cleaned = cleaned.replace(PAN_PATTERN, (match) => {
    const placeholder = `[PAN_${++counter.pan}]`;
    replacements.set(placeholder, match);
    return placeholder;
  });

  cleaned = cleaned.replace(IFSC_PATTERN, (match) => {
    const placeholder = `[IFSC_${++counter.ifsc}]`;
    replacements.set(placeholder, match);
    return placeholder;
  });

  cleaned = cleaned.replace(EMAIL_PATTERN, (match) => {
    const placeholder = `[EMAIL_${++counter.email}]`;
    replacements.set(placeholder, match);
    return placeholder;
  });

  cleaned = cleaned.replace(PHONE_PATTERN, (match) => {
    if (match.trim().length < 10) return match;
    const placeholder = `[PHONE_${++counter.phone}]`;
    replacements.set(placeholder, match);
    return placeholder;
  });

  cleaned = cleaned.replace(ACCOUNT_PATTERN, (match) => {
    if (match.length < 9) return match;
    const placeholder = `[ACCOUNT_${++counter.account}]`;
    replacements.set(placeholder, match);
    return placeholder;
  });

  return { cleaned, replacements };
}

export function restorePii(text: string, replacements: Map<string, string>): string {
  let restored = text;
  for (const [placeholder, original] of replacements) {
    restored = restored.replaceAll(placeholder, original);
  }
  return restored;
}
