import NextAuth from "next-auth";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcryptjs from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('these are the credentials : ', credentials)
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          const isValidPassword = await bcryptjs.compare(credentials.password, user.password);
          console.log('this is the validPassword : ', isValidPassword)
          if (isValidPassword) {
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET, 
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
