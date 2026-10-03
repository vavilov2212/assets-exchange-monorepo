import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { CredentialsProviderConfig } from './providers';

export const authConfig: NextAuthOptions = {
  providers: [CredentialsProvider(CredentialsProviderConfig)],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  callbacks: {
    async session(args) {
      const { session } = args;
      console.log('args', args);
      console.log('----- authConfig session callback ------ \n');
      return session;
    },
    async jwt(args) {
      const { token } = args;
      console.log('args', args);
      console.log('----- authConfig jwt callback ------ \n');
      return token;
    },
    async redirect(args) {
      const { baseUrl } = args;
      console.log('args', args);
      console.log('----- authConfig redirect callback ------ \n');
      return baseUrl;
    },
  },
};
