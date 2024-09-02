// pages/api/reset-password.js

import { hash } from 'bcryptjs'; // Import bcryptjs for hashing passwords
import prisma from '@/prisma/client';
import { connectToDatabase } from '@/helper/dbconnect';
import { NextRequest, NextResponse } from 'next/server';
import { stat } from 'fs';


export async function POST(req : NextRequest){
    try {
        connectToDatabase()
        const { email} = await req.json();
        const user = await prisma.user.findUnique({
            where: { email: email },
          });
          console.log('this is the user :', user)
        
          if (!user) {
            return NextResponse.json({ message: 'User not found' }, {status : 404});
          }

          return NextResponse.json(user, {status : 200})

    } catch (error) {
        return NextResponse.json({ message: 'user not found', error: error }, { status: 500 });
    }finally{
        await prisma.$disconnect();
    }
}



export async function PATCH(req : NextRequest) {
    try {
        connectToDatabase()
        if (req.method !== 'PATCH') {
          return NextResponse.json({ message: 'Method Not Allowed' },{status : 405});
        }
      
        const { email, password, confirmPassword } = await req.json();
      
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        console.log('this is the user :', user)
      
        if (!user) {
          return NextResponse.json({ message: 'User not found' }, {status : 404});
        }
      
        if (password !== confirmPassword) {
          return NextResponse.json({ message: 'Passwords do not match' }, {status : 400});
        }
      
        const hashedPassword = await hash(password, 10);
        await prisma.user.update({
          where: { email: email },
          data: { password: hashedPassword },
        });
      
        return NextResponse.json({ message: 'Password reset successfully' }, {status:200});
    } catch (error) {
        return NextResponse.json({ message: 'Error resetting password', error: error }, { status: 500 });
    }finally{
        await prisma.$disconnect();
    }
}
