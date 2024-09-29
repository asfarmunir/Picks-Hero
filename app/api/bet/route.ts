import { connectToDatabase } from "@/helper/dbconnect";
import { ALL_STEP_CHALLENGES } from "@/lib/constants";
import { areStepObjectivesComplete, checkObjectivesAndUpgrade, getOriginalAccountValue } from "@/lib/utils";
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

  // reject if amount is NaN
  if (isNaN(bet.pick)) {
    return NextResponse.json(
      { error: "Bet amount must be a number" },
      { status: 400 }
    );
  }
  
  // reject if amount is less than minimum allowed
  const minPickAmount = getOriginalAccountValue(account) * ALL_STEP_CHALLENGES.minPickAmount;
  if (bet.pick < minPickAmount) {
    return NextResponse.json(
      { error: `Bet amount must be greater than $${minPickAmount}` },
      { status: 400 }
    );
  }

  // reject if amount is greater than maximum allowed
  const maxPickAmount = getOriginalAccountValue(account) * ALL_STEP_CHALLENGES.maxPickAmount;
  if (bet.pick > maxPickAmount) {
    return NextResponse.json(
      { error: `Bet amount must be less than $${maxPickAmount}` },
      { status: 400 }
    );
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

  // Using transaction to place bet and update account balance
  try {
    const [newBet, updatedAccount] = await prisma.$transaction([
      // Create a new bet
      prisma.bets.create({
        data: {
          userId: existingUser.id,
          accountId: account.id,
          betStatus: "OPENED",
          betDate: new Date(),
          ...bet,
        },
      }),
      // Subtract bet.pick from account balance
      prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          balance: {
            decrement: bet.pick,
          },
          picks: {
            increment: 1,
          }
        },
      }),
    ]);

    // After transaction, check objectives
    await checkObjectivesAndUpgrade(prisma, updatedAccount);

    // If the transaction is successful, return success response
    return NextResponse.json(
      { message: "Bet placed successfully", bet: newBet },
      { status: 200 }
    );
  } catch (error) {
    console.error('Transaction error:', error);
    return NextResponse.json({ error: "Failed to place bet" }, { status: 500 });
  }
}
