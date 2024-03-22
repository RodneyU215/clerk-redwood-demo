import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'

const ADD_USER_MUTATION = gql`
  mutation AddUser($input: AddUserInput!) {
    addUser(input: $input)
  }
`

export default function AddUser({
  orgId,
  userId,
}: {
  orgId: string
  userId: string
}) {
  const [email, setEmail] = useState('')
  const [addUser, { loading, error }] = useMutation(ADD_USER_MUTATION, {
    onCompleted: () => {
      setEmail('')
    },
  })

  const handleAddUser = async () => {
    await addUser({
      variables: {
        input: { email, orgId, userId },
      },
    })
  }
  return (
    <div className="flex flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User email"
        className="input input-bordered input-primary w-full max-w-xs border"
      />
      <button
        className="btn btn-primary ml-4 rounded-lg border p-2"
        onClick={handleAddUser}
        disabled={loading}
      >
        Add
      </button>
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
