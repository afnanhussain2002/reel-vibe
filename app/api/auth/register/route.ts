import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const {email, password} = await request.json();

    if (!email || !password) {
        return NextResponse.json({error: "Please provide email and password"}, {status: 400});
    }

    try {
        await dbConnect();
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

         await User.create({email, password});

        return NextResponse.json({message: "User created successfully"}, {status: 201});


    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}