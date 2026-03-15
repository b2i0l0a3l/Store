import type { LoginState, RegisterState } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginFields(
  email: string,
  password: string,
): LoginState["errors"] | null {
  const errors: LoginState["errors"] = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateRegisterFields(
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
): RegisterState["errors"] | null {
  const errors: RegisterState["errors"] = {};

  if (!userName || userName.length < 3) {
    errors.userName = "Username must be at least 3 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
