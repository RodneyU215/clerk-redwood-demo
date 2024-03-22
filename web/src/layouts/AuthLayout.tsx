import { useEffect } from 'react'

import { useUser } from '@clerk/clerk-react'

import { navigate, useLocation } from '@redwoodjs/router'

import { useAuth } from '../auth'

const AuthLayout = ({ children }) => {
  const { user } = useUser()
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (
      isAuthenticated &&
      user.publicMetadata &&
      !(user.publicMetadata.isOnboarded as boolean) &&
      location.pathname !== '/onboarding'
    ) {
      navigate('/onboarding')
    }
  }, [isAuthenticated, user.publicMetadata, location.pathname])

  return <>{children}</>
}

export default AuthLayout
