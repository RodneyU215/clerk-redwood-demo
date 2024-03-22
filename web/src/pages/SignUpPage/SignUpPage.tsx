import { SignUpButton, SignUp } from '@clerk/clerk-react'

const SignUpPage = () => (
  <SignUp routing="path" path="/sign-up" redirectUrl="/onboarding" />
)

export default SignUpPage
