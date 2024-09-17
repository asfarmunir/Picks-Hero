import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/helper/dbconnect";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch accounts" }, { status: 500 });
  }
}
