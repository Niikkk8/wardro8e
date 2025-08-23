export function validateEmail(email: string): boolean {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Password must be at least 8 characters long");
  if (!/(?=.*[a-z])/.test(password)) errors.push("Include at least one lowercase letter");
  if (!/(?=.*[A-Z])/.test(password)) errors.push("Include at least one uppercase letter");
  if (!/(?=.*\d)/.test(password)) errors.push("Include at least one number");
  if (!/(?=.*[@$!%*?&])/.test(password)) errors.push("Include at least one special character (@$!%*?&)");
  return { isValid: errors.length === 0, errors };
}


