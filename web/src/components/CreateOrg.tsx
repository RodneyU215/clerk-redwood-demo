import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'

const CREATE_ORGANIZATION_MUTATION = gql`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      name
    }
  }
`

export default function CreateOrg({
  userId,
  getOrgsRefetch,
}: {
  userId: string
  getOrgsRefetch
}) {
  const [newOrgName, setNewOrgName] = useState('')

  const [createOrganization] = useMutation(CREATE_ORGANIZATION_MUTATION, {
    onCompleted: async () => {
      setNewOrgName('')
      await getOrgsRefetch()
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await createOrganization({
      variables: {
        input: {
          name: newOrgName,
          createdBy: userId,
        },
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={newOrgName}
        onChange={(e) => setNewOrgName(e.target.value)}
        placeholder="Enter organization name"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary ml-4">
        Create Organization
      </button>
    </form>
  )
}
