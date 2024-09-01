import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function GET (request : NextRequest){
    const token = getToken({req : request})
    return NextResponse.json(token)

}