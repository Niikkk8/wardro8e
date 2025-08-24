export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/\d/.test(password)) errors.push("One number");
  if (!/[@$!%*?&]/.test(password)) errors.push("One special character");
  
  return { isValid: errors.length === 0, errors };
}

// Consolidate all form validation in one place
export interface SignupForm {
  brandName: string;
  brandLegalName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export function validateSignupForm(form: SignupForm): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!form.brandName.trim()) errors.brandName = "Brand name is required";
  if (!form.brandLegalName.trim()) errors.brandLegalName = "Legal business name is required";
  
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(form.email)) {
    errors.email = "Enter a valid email";
  }

  const passwordCheck = validatePassword(form.password);
  if (!passwordCheck.isValid) {
    errors.password = passwordCheck.errors.join(', ');
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}