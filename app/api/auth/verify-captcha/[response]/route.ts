import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest, { params } : { params: { response: string } }) {
  try{
    const secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';
    const { response } = params; 
    
    const fetchQuery = await fetch(`/recaptcha/api/siteverify?secret=${secret}&response=${response}`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const apiResponse = await fetchQuery.json();
    return NextResponse.json({ success: apiResponse?.success })
  } catch(error:any){
    return NextResponse.json({ success: false })
  }
}