import React from 'react'

import { useQuery } from '@redwoodjs/web'

import AddUser from './AddUser'
import CreateOrg from './CreateOrg'

const QUERY = gql`
  query GetOrganizations {
    getOrganizations {
      id
      name
      createdBy
      members_count
    }
  }
`

type OrganizationListProps = {
  userId: string
}

const OrganizationList: React.FC<OrganizationListProps> = ({ userId }) => {
  const { data, loading, error, refetch } = useQuery(QUERY)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <CreateOrg userId={userId} getOrgsRefetch={refetch} />
      {data.getOrganizations && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Organization Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Member count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Add User
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.getOrganizations.map((org) => (
              <tr key={org.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {org.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {org.createdBy}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {org.members_count || 0}
                </td>
                <td className="px-6 py-4">
                  <AddUser orgId={org.id} userId={userId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrganizationList
