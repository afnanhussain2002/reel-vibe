import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const {email, password} = await request.json();

    if (!email || !password) {
        return NextResponse.json({error: "Please provide email and password"}, {status: 400});
    }

    try {
        await dbConnect();

    } catch (error) {
        
    }
}