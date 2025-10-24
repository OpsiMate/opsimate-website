import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "@/lib/posts.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end("Method Not Allowed");
}
