import { NextResponse, NextRequest } from "next/server";
import speakeasy from 'speakeasy'
import QRcode from 'qrcode'
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { getSession } from "next-auth/react";


export async function GET (){
    const session = await getServerSession(authOptions);
    console.log('this is the session : ', session)

    return NextResponse.json(session)
}
