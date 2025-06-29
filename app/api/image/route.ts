import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File; // Assuming file input from form

    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    // Convert the file to a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Convert the image to WebP format
    const webpImageBuffer = await sharp(fileBuffer)
      .webp({ quality: 80 })
      .toBuffer();

    const result = await uploadImageFirebase(webpImageBuffer);

    return NextResponse.json(
      {
        message: "Product Image uploaded successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    return NextResponse.json(
      { message: "Failed to upload image", error: error },
      { status: 500 }
    );
  }
}

async function uploadImageFirebase(buffer: Buffer) {
  const fileBuffer = buffer;

  const fileRef = ref(storage, `products/${uuidv4()}.webp`);
  const uploadTask = uploadBytesResumable(fileRef, fileBuffer);

  return new Promise<void>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (error) => {
        // Handle errors
        console.error(error);
        reject(error);
      },
      async () => {
        // Get the download URL
        try {
          const url = await getDownloadURL(fileRef);

          resolve();
          return { url };
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }
    );
  });
}
