import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/helper/dbconnect";
import { generateCustomId } from "@/helper/keyGenerator";
import { getServerSession } from "next-auth";
import {
  BONUS,
  LEVEL_1_TARGET,
  LEVEL_2_TARGET,
  REFER_COMMISSIONS,
} from "@/lib/constants";

function generateInvoice(account: any, newAccount: any, userId: any) {
  // strip $ from accounPrice
  const accountPrice = account.accountPrice.replace("$", "");

  const invoice = {
    amount: parseFloat(accountPrice),
    invoiceNumber: generateCustomId(false, false),
    accountId: newAccount.id,
    status: "paid",
    userId: userId,
    paymentMethod: "card",
    paymentDate: new Date(),
  };
  return invoice;
}

async function handleReferralCommission(user: any, account: any, accountInvoice: any) {
  const referrerId = user.referredBy;
  if (!referrerId) {
    return null;
  }

  const referrer = await prisma.user.findFirst({
    where: {
      id: referrerId,
    },
  });

  if (!referrer) {
    return null;
  }

  const totalReferrals = referrer.totalReferrals;

  // Determine referral level
  let referralLevel: "level1" | "level2" | "level3" = "level1";
  if (totalReferrals < LEVEL_1_TARGET) {
    referralLevel = "level1";
  } else if (totalReferrals < LEVEL_2_TARGET) {
    referralLevel = "level2";
  } else {
    referralLevel = "level3";
  }

  const levelInformation = REFER_COMMISSIONS[referralLevel];
  const commission = levelInformation.commission;
  const bonus =
    totalReferrals === REFER_COMMISSIONS["level1"].target ? BONUS : 0;
  const accountPrice = account.accountPrice.replace("$", "");

  const newTotalEarned =
    referrer.totalEarned + (commission * Number(accountPrice)) + bonus;

  // Update referrer's earnings
  await prisma.user.update({
    where: {
      id: referrer.id,
    },
    data: {
      totalEarned: newTotalEarned,
    },
  });

  // Create a new commission record
  await prisma.referralHistory.create({
    data: {
      userId: user.id,
      referredUserId: referrer.id,
      status: "paid",
      orderValue: parseFloat(account.accountPrice.replace("$", "")),
      commission: commission * Number(accountPrice),
      orderNumber: accountInvoice.invoiceNumber,
    },
  });
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { account, billingDetails, card, userId } = await req.json();

    try {
      await connectToDatabase();

      const session = await getServerSession();
      if (!session) {
        return NextResponse.json(
          { error: "You must be logged in to create an account" },
          { status: 401 }
        );
      }

      // find user
      const user = await prisma.user.findFirst({
        where: {
          email: session.user?.email,
        },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const startingBalance = parseFloat(
        account.accountSize.replace("K", "000")
      );

      // Create a new account linked to the user
      const newAccount = await prisma.account.create({
        data: {
          accountSize: account.accountSize,
          accountType: account.accountType,
          status: account.status,
          balance: startingBalance,
          accountNumber: generateCustomId(),
          userId: user.id,
        },
      });

      // save billing address
      const billingAddress = await prisma.billingAddress.create({
        data: {
          address: billingDetails.address,
          city: billingDetails.city,
          country: billingDetails.country,
          email: billingDetails.email,
          firstName: billingDetails.firstName,
          lastName: billingDetails.lastName,
          phone: billingDetails.phone,
          zipCode: billingDetails.postalCode,
          state: billingDetails.state,
          accountId: newAccount.id,
        },
      });

      console.log("Billing address saved!");

      // save payment card

      const existingCard = await prisma.paymentCard.findFirst({
        where: {
          cardNumber: card.cardNumber,
          userId: user.id
        },
      });

      let paymentCardId = existingCard?.id;
      if (!existingCard) {
        const paymentCard = await prisma.paymentCard.create({
          data: {
            cardNumber: card.cardNumber,
            cardExpiry: card.cardExpiry,
            zipCode: card.zipCode,
            cardCvv: card.cardCvv,
            country: card.country,
            userId: userId,
            accountId: newAccount.id,
          },
        });

        paymentCardId = paymentCard.id;
      }

      if(!paymentCardId) {
        return NextResponse.json({ error: "Failed to save payment card" }, { status: 500 });
      }

      const accountInvoice = await prisma.accountInvoices.create({
        data: {
          ...generateInvoice(account, newAccount, userId),
          paymentCardId: paymentCardId,
        },
      });

      // give commission to referrer on first purchase
      const numberOfAccounts = await prisma.account.count({
        where: {
          userId: user.id,
        },
      })

      if(numberOfAccounts > 1)
        return NextResponse.json({ newAccount }, { status: 200 });

      await handleReferralCommission(user, account, accountInvoice);
      
      return NextResponse.json({ newAccount }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
