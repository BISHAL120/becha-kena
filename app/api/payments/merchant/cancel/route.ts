import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // Access query parameters using searchParams
    const Id = url.searchParams.get("id");

    return NextResponse.redirect(
      new URL(`/payments/cancel?id=${Id}`, req.url),
      303
    );
  } catch (error) {
    console.log("Payment_Cancel", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
