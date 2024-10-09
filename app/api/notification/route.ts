import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    await connectToDatabase();

    const { message, type } = await req.json();

    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email
            }
        });
        
        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const notification = await prisma.notification.create({
            data: {
                content: message,
                type,
                userId: user.id,
                read: false,
            }
        });

        return NextResponse.json({ notification }, { status : 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
    
}

export async function GET(req: NextRequest) {
    await connectToDatabase();

    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email
            }
        });

        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: user.id
            }
        });

        return NextResponse.json({ notifications }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}