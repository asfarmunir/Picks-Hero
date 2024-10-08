import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const accounts = await prisma.account.findMany({
      where: {
        status: "FUNDED",
      },
      select: {
        userId: true,
        totalFundedAmount: true,
      },
      orderBy: {
        totalFundedAmount: "desc",
      },
    });

    const leaderboard = accounts.map((account) => {
      return {
        userId: account.userId,
        totalFundedAmount: account.totalFundedAmount,
      };
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: leaderboard.map((item) => item.userId),
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileLevel: true,
        country: true,
      },
    });

    const leaderboardWithUser = leaderboard.map((item) => {
      const user = users.find((user) => user.id === item.userId);
      return {
        ...item,
        user: user,
        rank: leaderboard.indexOf(item) + 1,
      };
    });

    return NextResponse.json(
      { leaderboard: leaderboardWithUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
