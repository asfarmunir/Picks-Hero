import NextAuth from "next-auth";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }
      
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            throw new Error('No user found with this email');
          }

      
          const isValidPassword = await compare(credentials.password, user.password);
          if (!isValidPassword) {
            throw new Error('Invalid password');
          }

          if (!user.twoFactorSecret || user.twoFactorSecret === null) {
          console.log('1')

            const secret = speakeasy.generateSecret({ name: "PICKS-HERO" });
          console.log('2')

            const data = await QRCode.toDataURL(secret.otpauth_url || '');
          console.log('3')

            await prisma.user.update({
              where: { email: credentials.email },
              data: {
                twoFactorSecret: secret.base32,
                ascii: secret.ascii,
                otpUrl: data,
              },
            });
          console.log('4')

            user.twoFactorSecret = secret.base32;
            console.log('5')
          }

          return user;
        } catch (error : any){
          throw new Error(error.message);
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,  
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }: { session: any; token: JWT }) {
      console.log('this is the session : ', session )
      console.log('this is the token : ', token)
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

 const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
