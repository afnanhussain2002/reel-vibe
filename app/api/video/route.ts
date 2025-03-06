import { dbConnect } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
      try {
        await dbConnect();
        const videos = await Video.find();
      } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
      }
}