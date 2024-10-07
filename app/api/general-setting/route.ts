import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      firstName,
      lastName,
      // email,
      phone,
      address,
      // dateOfBirth,
      password,
    } = body;

    if (
      !id ||
      !firstName ||
      !lastName ||
      // !email ||
      !phone ||
      !address 
      // !dateOfBirth
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // const parsedDateOfBirth = new Date(dateOfBirth);
    // if (isNaN(parsedDateOfBirth.getTime())) {
    //   return NextResponse.json(
    //     { message: "Invalid Date of Birth format" },
    //     { status: 400 }
    //   );
    // }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        firstName,
        lastName,
<<<<<<< HEAD
        email,
=======
        // email,
>>>>>>> 87699aa2b7abe4d9103cb3a5dcf4aba498944fb6
        phoneNumber : phone,
        address,
        // dateOfBirth: parsedDateOfBirth,
        ...(password && { password: hashedPassword }),
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: "Server error" },
      { status: 500 }
    );
  }
}
