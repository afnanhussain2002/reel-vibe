import { dbConnect } from "@/lib/db";
import { authOptions } from "@/lib/option";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
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

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
}