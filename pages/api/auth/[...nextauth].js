import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../helpers/prisma";

// const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // In Use when session strategy set to "jwt"
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.role = "user";
      }
      return token;
    },
    // run after jwt callback (above one)
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.role = token.role;
      }
      return session;
    },
  },
  // Providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  // Theme
  theme: {
    colorScheme: "dark",
  },
  // Session strategy
  session: { strategy: "jwt" },
  // jwt config
});
