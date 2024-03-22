import { useUser } from '@clerk/clerk-react'

import { Redirect, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'

const COMPLETE_ONBOARDING_MUTATION = gql`
  mutation CompleteOnboarding {
    completeOnboarding
  }
`

const OnboardingPage = () => {
  const { user } = useUser()
  const [completeOnboarding, { loading, error }] = useMutation(
    COMPLETE_ONBOARDING_MUTATION
  )

  const handleButtonClick = async () => {
    try {
      await completeOnboarding()
    } catch (e) {
      console.error('Failed to complete onboarding:', e)
      console.error('Mutation Error:', error)
    }
    await user.reload()
    navigate(routes.home())
  }

  if (error) {
    console.error('Failed to complete onboarding:', error)
  }

  if (user.publicMetadata.isOnboarded) {
    return <Redirect to={routes.home()} />
  }

  return (
    <>
      <Metadata title="Onboarding" description="Onboarding page" />

      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Onboarding</h1>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Complete Onboarding'}
        </button>
        {error && <p className="mt-2 text-red-500">{error.message}</p>}
      </div>
    </>
  )
}

export default OnboardingPage
