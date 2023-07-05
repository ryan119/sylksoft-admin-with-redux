import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'


export default NextAuth({
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        const webUrl = process.env.NEXT_PUBLIC_APP_URL
        const response = await fetch(
          baseUrl + '/api/login',
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json()
        if (data?.errorType) {
          return null
        } else {
          return {
            ...data
          }
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user
      return session
    }
  }
})
