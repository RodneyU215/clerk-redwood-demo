import { SignUp } from '@clerk/clerk-react'

// Routing=Path requires a wildcard route.
const SignUpPage = () => <SignUp routing="hash" redirectUrl="/onboarding" />

export default SignUpPage
