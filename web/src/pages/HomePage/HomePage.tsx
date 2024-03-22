import React from 'react'

import { useUser } from '@clerk/clerk-react'
import { OrganizationSwitcher } from '@clerk/clerk-react'

import { Redirect, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import OrganizationList from 'src/components/OrganizationList'

import { useAuth } from '../../auth'

const HomePage = () => {
  const { logOut } = useAuth()
  const { user, isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <Redirect to={routes.signUp()} />
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <Metadata title="Home" description="Home page" />
        <div>
          <div className="flex w-full flex-row">
            <div className="grow">
              <h1>Hello {(user?.firstName as string) || 'there'}!</h1>
              <button onClick={async () => await logOut()}>Log out</button>
            </div>
            <OrganizationSwitcher />
          </div>
          <OrganizationList userId={user?.id as string} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
