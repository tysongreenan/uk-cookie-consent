import { validatePassword } from '@/lib/sanitize'

export type SignupFormInput = {
  name: string
  email: string
  password: string
  agreeToTerms: boolean
}

export type SignupFieldErrors = {
  name?: string
  email?: string
  password?: string
  terms?: string
}

export const PASSWORD_RULES = [
  { id: 'length', label: '8+ characters', test: (password: string) => password.length >= 8 },
  { id: 'upper', label: 'One uppercase letter', test: (password: string) => /[A-Z]/.test(password) },
  { id: 'lower', label: 'One lowercase letter', test: (password: string) => /[a-z]/.test(password) },
  { id: 'number', label: 'One number', test: (password: string) => /\d/.test(password) },
] as const

export function getPasswordRuleStates(password: string) {
  return PASSWORD_RULES.map((rule) => ({
    id: rule.id,
    label: rule.label,
    met: rule.test(password),
  }))
}

export function getSignupFieldErrors(input: SignupFormInput): SignupFieldErrors {
  const errors: SignupFieldErrors = {}
  if (!input.name.trim()) {
    errors.name = 'Enter your name'
  }
  if (!input.email.trim()) {
    errors.email = 'Enter your email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'Enter a valid email address'
  }
  const passwordValidation = validatePassword(input.password)
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0] || 'Please choose a stronger password'
  }
  if (!input.agreeToTerms) {
    errors.terms = 'Please agree to the Terms of Service and Privacy Policy'
  }
  return errors
}

export function isSignupFormValid(input: SignupFormInput): boolean {
  return Object.keys(getSignupFieldErrors(input)).length === 0
}
