import { connectToDatabase } from "@/lib/database";
import { getDaysDifference, getOriginalAccountValue } from "@/lib/utils";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { currency, networkAddress, accountId } = await req.json();

    await connectToDatabase();
    
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json(
            { error: "You must be logged in to create an account" },
            { status: 401 }
        );
    }

    if(!accountId) {
        return NextResponse.json(
            { error: "Please select an account" },
            { status: 400 }
        );
    }
    
    if(!currency || !networkAddress ) {
        return NextResponse.json(
            { error: "Please fill all the fields" },
            { status: 400 }
        );
    }

    if(currency !== "USDT_ERC20" && currency !== "ETH_ERC20") {
        return NextResponse.json(
            { error: "Invalid currency" },
            { status: 400 }
        );
    }

    try {

        // get user
        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email,
            },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // get account
        const account = await prisma.account.findFirst({
            where: {
                id: accountId
            }
        });
        if (!account) {
            return NextResponse.json({ error: "Account not found" }, { status: 404 });
        }

        if(account.totalFundedAmount-getOriginalAccountValue(account) <= 0) {
            return NextResponse.json({ error: "Cannot request payout for $0." }, { status: 400 });
        }

        const pendingRequests = await prisma.fundedPayoutRequests.findFirst({
            where: {
                userId: user.id,
                accountId: account.id,
                status: "PENDING"
            }
        });
        
        const remainingCountdown = getDaysDifference({ date1: account.fundedPayoutTimer || new Date(), date2: new Date()});
        if(parseInt(remainingCountdown) > 0) {
            return NextResponse.json({ error: `You can request payout after ${remainingCountdown} days` }, { status: 400 });
        }

        if(pendingRequests && pendingRequests.amount === account.totalFundedAmount-getOriginalAccountValue(account)) {
            return NextResponse.json({ error: "You have already requested for payout" }, { status: 400 });
        }

        
        // create payout request
        await prisma.fundedPayoutRequests.create({
            data: {
                userId: user.id,
                accountId: account.id,
                currency: currency as "USDT_ERC20" | "ETH_ERC20",
                networkAddress: networkAddress as string,
                amount: account.totalFundedAmount-getOriginalAccountValue(account),
                status: "PENDING",
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}