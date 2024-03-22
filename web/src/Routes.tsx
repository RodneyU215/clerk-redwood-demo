// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import AuthLayout from './layouts/AuthLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="signUp" wrap={AuthLayout}>
        <Route path="/onboarding" page={OnboardingPage} name="onboarding" />
        <Route path="/" page={HomePage} name="home" />
      </PrivateSet>
      <Route path="/sign-in" page={SignInPage} name="signIn" />
      <Route path="/sign-up" page={SignUpPage} name="signUp" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
