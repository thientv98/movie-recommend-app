import { USER_LOGIN, USER_ME } from "@/grapql/user.query";
import { client } from "@/lib/client";
import { ApolloClient, HttpLink, InMemoryCache, gql, useMutation } from "@apollo/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: "secret",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { data: dataLogin } = await client.mutate({
          mutation: USER_LOGIN,
          variables: {
            loginInput: {
              email: credentials?.email,
              password: credentials?.password,
            },
          }
        });

        if (dataLogin.login) {
          return dataLogin.login
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        ...session.user,
        ...token,
      };
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ account, profile }: any) {
      return true;
    },
  },
};
export default NextAuth(authOptions);
