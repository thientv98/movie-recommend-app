import { CREATE_USER } from "@/query/user.query";
import { useMutation } from "@apollo/client";
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
        const res = await fetch(process.env.API_URL + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const userTokens = await res.json();

        if (userTokens.data.token) {
          const res = await fetch(process.env.API_URL + "/auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userTokens.data.token}`,
            },
          });

          const userData = await res.json();

          const user = {
            ...userData.data,
            accessToken: userTokens.data.token,
          };
          return user;
        } else {
          return null;
        }
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
      console.log("refetch");

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
