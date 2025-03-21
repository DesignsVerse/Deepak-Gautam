import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises"; // Use the promises version of fs for async/await

// Define the shape of the request body
interface ClickData {
  timestamp: string;
  button: string;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = (await req.json()) as ClickData;
    const { timestamp, button } = body;

    // Validate the request body
    if (!timestamp || !button) {
      return NextResponse.json(
        { error: "Missing timestamp or button" },
        { status: 400 }
      );
    }

    // Data to save
    const clickData: ClickData = {
      timestamp,
      button,
    };

    // Append to a file
    try {
      await fs.appendFile(
        "clicks.txt", // File will be created in the root directory
        `${JSON.stringify(clickData)}\n`
      );
    } catch (err) {
      console.error("Error saving click:", err);
      return NextResponse.json({ error: "Error saving click" }, { status: 500 });
    }

    return NextResponse.json({ message: "Click tracked" }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/track-click:", error);
    return NextResponse.json({ error: "Error saving click" }, { status: 500 });
  }
}