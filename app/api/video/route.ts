import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
      try {
        await dbConnect();
      } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
      }
}