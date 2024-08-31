import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/helper/dbconnect";
import * as bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
    connectToDatabase()
  try {
    const {firstName , lastName , country , email,password } =  await req.json()

    const existedEmail = await prisma.user.findUnique({
      where :{
        email : email
      }
    })

    if (existedEmail)
    {
      return NextResponse.json({
        message : "Email exists already, please enter different Email"
      }, {status : 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log('this is the hashedPassword : ', hashedPassword)
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        country: country,
        email: email,
        password: hashedPassword
      },
    });
    return NextResponse.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user', error: error}, { status: 500 });
  }
  finally{
    await prisma.$disconnect()
  }
}
