import { connectToDatabase } from "@/helper/dbconnect";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // connect to database
  await connectToDatabase();

  // authenticate session
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to place a bet" },
      { status: 401 }
    );
  }

  // get user details
  const user = session.user;
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // find user using user.email
  const existingUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // get bet details
  const { bet, accountNumber } = await req.json();

  // find account Id from account number
  const account = await prisma.account.findFirst({
    where: {
      accountNumber,
    },
  });

  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  // reject if account balance is less than bet.pick
  if (account.balance < bet.pick) {
    return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
  }

  // select if bet already exists
  const existingBet = await prisma.bets.findFirst({
    where: {
      userId: existingUser.id,
      accountId: account.id,
      eventId: bet.eventId,
    },
  });

  if (existingBet) {
    return NextResponse.json(
      { error: "Hedging isn't allowed." },
      { status: 400 }
    );
  }

  // create a new bet
  const newBet = await prisma.bets.create({
    data: {
      userId: existingUser.id,
      accountId: account.id,
      betStatus: "OPENED",
      betDate: new Date(),
      ...bet,
    },
  });

  if (!newBet) {
    return NextResponse.json({ error: "Failed to place bet" }, { status: 500 });
  }

  // subtract bet.pick from account balance
  const updatedAccount = await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      balance: {
        decrement: bet.pick,
      },
    },
  });

  if (!updatedAccount) {
    return NextResponse.json({ error: "Failed to place bet" }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Bet placed successfully" },
    { status: 200 }
  );
}
