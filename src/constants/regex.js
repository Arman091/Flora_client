
// Email: basic robust pattern for common emails
export const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// International phone number (E.164-like): starts with + and 8–15 digits total
export const INTERNATIONAL_PHONE_REGEX =
  /^\+[1-9]\d{7,14}$/;

// Password: minimum 8 chars, at least 1 uppercase, 1 number
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()[\]{}\-_=+|;:'",.<>/?`~]{8,}$/;