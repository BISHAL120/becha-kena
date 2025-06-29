import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url, index } = await req.json();

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename=image_${index}.jpg`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
