// import { NextResponse, NextRequest } from "next/server";
// import speakeasy from "speakeasy";
// import QRcode from "qrcode";
// import prisma from "@/prisma/client";
// import { getServerSession } from "next-auth";
// import { AuthOptions } from "../authOptions";

// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(AuthOptions);
//     const user = await prisma.user.findUnique({
//         where : {
//             email : session?.user?.email!
//         }
//     })
//     return NextResponse.json({qrcode : user?.otpUrl , twofactorsecret : user?.twoFactorSecret});
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred", error },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../authOptions";

export async function GET(req: NextRequest) {
  try {
    // Check if session is available
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access - No session found" },
        { status: 401 }
      );
    }

    // Fetch the user from Prisma using the email from session
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return the QR code and secret if user exists
    return NextResponse.json({
      qrcode: user?.otpUrl,
      twofactorsecret: user?.twoFactorSecret,
    });
  } catch (error:any) {
    console.error("Error occurred while generating QR code:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}




