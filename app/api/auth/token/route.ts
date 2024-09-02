import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET (request : NextRequest){
    const token = await getToken({req : request})
    console.log("this is the token : ", token)
    return NextResponse.json(token)

}