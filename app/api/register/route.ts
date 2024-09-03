import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/helper/dbconnect";
import * as bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  connectToDatabase();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD, 
    },
  });

  try {
    const { firstName, lastName, country, email, password } = await req.json();
    const existedEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existedEmail) {
      return NextResponse.json({
        message: "User with this email already exists",
      }, { status: 401 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        country: country,
        email: email,
        password: hashedPassword,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL, 
      to: email, 
      subject: 'Welcome to PicksHero! Confirm Your Account',
      text: `Hello ${firstName},\n\nWelcome to PicksHero! We're thrilled to have you on board. You're just one step away from unlocking all the exciting features of our app.\n\nThank you for joining our community. Get ready to make your picks and start winning!\n\nBest regards,\nThe PicksHero Team`,
      html: `<p>Hello ${firstName},</p>
             <p>Welcome to <strong>PicksHero</strong>! We're thrilled to have you on board. You're just one step away from unlocking all the exciting features of our app.</p>
             <p>Thank you for joining our community. Get ready to make your picks and start winning!</p>
             <p>Best regards,<br/>The PicksHero Team</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');

    return NextResponse.json({ message: 'User created successfully, confirmation email sent', user: newUser });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
