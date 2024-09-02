import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import * as bcryptjs from "bcryptjs";
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Received credentials:', credentials);
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
      
          const isValidPassword = await bcryptjs.compare(credentials.password, user.password);
          console.log('Password validation result:', isValidPassword);
      
          if (!isValidPassword) {
            throw new Error('Invalid password');
          }
          
          if (!user.twoFactorSecret || user.twoFactorSecret === null) {
            const secret = speakeasy.generateSecret({ name: "WeAreDevs" });
            const data = await QRCode.toDataURL(secret.otpauth_url || '');
            console.log('this is the data : ', data)
            await prisma.user.update({
              where: { email: credentials.email },
              data: { 
                twoFactorSecret: secret.base32,
                ascii: secret.ascii,
                otpUrl: secret.otpauth_url
              },
            });
            user.twoFactorSecret = secret.base32;
          }
          
          return user;
        } catch (error) {
          console.error('Error during authorization:', error);
          throw new Error('Authentication failed');
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'as const,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
