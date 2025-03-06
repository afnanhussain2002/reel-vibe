import { dbConnect } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
      try {
        await dbConnect();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!videos || videos.length === 0) {
            return NextResponse.json({error: "No videos found"}, {status: 404});
        }

        return NextResponse.json(videos, {status: 200});

      } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
      }
}