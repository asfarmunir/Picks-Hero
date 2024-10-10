import { connectToDatabase } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

import sgMail from "@sendgrid/mail";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { certificateType, accountId } = await req.json();

  if (!certificateType) {
    return NextResponse.json(
      { message: "Certificate type is required" },
      { status: 400 }
    );
  }

  // Session authorization
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Send grid
  const API_KEY = process.env.SENDGRID_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ message: "API key not found" }, { status: 400 });
  }
  sgMail.setApiKey(API_KEY);

  // User details
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const account = await prisma.account.findFirst({
      where: {
        id: accountId,
      },
    });
    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    // Send email
    const msg = {
      to: user.email, // Change to your recipient
      from: "no-reply@pickshero.io", // Change to your verified sender
      subject: certificateType,
      text: "Demo Certificate",
      html: "<strong>HTML Code Here</strong>",
    };
    sgMail
      .send(msg)
      .then(async () => {
        // Create certificate
        const newCertificate = await prisma.certificateHistory.create({
          data: {
            type: certificateType,
            accountId,
            userId: user.id,
          },
        });
        if (!newCertificate) {
          return NextResponse.json(
            { message: "Certificate not created" },
            { status: 401 }
          );
        }

        return NextResponse.json({ message: "Email sent" }, { status: 200 });
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Error sending email");
      });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
