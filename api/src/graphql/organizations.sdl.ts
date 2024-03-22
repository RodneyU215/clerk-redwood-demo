import clerkClient from '@clerk/clerk-sdk-node'
import { gql } from 'graphql-tag'

export const schema = gql`
  type Organization {
    id: String!
    name: String!
    createdBy: String!
    members_count: Int
  }

  type Query {
    getOrganizations: [Organization!]! @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
    createdBy: String!
  }

  input AddUserInput {
    email: String!
    orgId: String!
    userId: String!
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    addUser(input: AddUserInput!): Boolean! @requireAuth
    completeOnboarding: Boolean! @requireAuth
  }
`

export const resolvers = {
  Query: {
    getOrganizations: async () => {
      return await clerkClient.organizations.getOrganizationList({
        includeMembersCount: true,
      })
    },
  },
  Mutation: {
    createOrganization: async (
      _root: unknown,
      { input }: { input: { name: string; createdBy: string } }
    ) => {
      const { name, createdBy } = input
      return await clerkClient.organizations.createOrganization({
        name,
        createdBy,
      })
    },
    addUser: async (
      _root: unknown,
      { input }: { input: { email: string; orgId: string; userId: string } }
    ) => {
      const { email, orgId, userId } = input
      try {
        await clerkClient.organizations.createOrganizationInvitation({
          organizationId: orgId,
          inviterUserId: userId,
          emailAddress: email,
          role: 'org:member',
        })
        return true
      } catch (error) {
        return false
      }
    },
    completeOnboarding: async () => {
      const user = context.currentUser
      if (!user) {
        throw new Error('User not found')
      }
      await clerkClient.users.updateUser(user.id, {
        publicMetadata: { isOnboarded: true },
      })
      return true
    },
  },
}
