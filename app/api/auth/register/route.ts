import { dbConnect } from "@/lib/db";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const {email, password} = await request.json();

    try {
        await dbConnect();
    } catch (error) {
        
    }
}