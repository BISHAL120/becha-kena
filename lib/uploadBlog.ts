"use server";

import db from "@/prisma/db";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function createBlogAction(data: {
  title: string;
  slug: string;
  content: string;
}) {
  // TODO: validate the data

  let post;

  try {
    post = await db.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
      },
    });

    if (!post) {
      return { error: "Failed to create the blog." };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "That slug already exists." };
    }

    return { error: error.message || "Failed to create the blog." };
  }

  revalidatePath("/");
  redirect(`/blogs`);
}
