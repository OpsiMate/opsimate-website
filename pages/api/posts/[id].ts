import type { NextApiRequest, NextApiResponse } from "next";
import { getPostById, isPostPublished } from "@/lib/posts.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  if (req.method === "GET") {
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ error: "not found" });
    if (!isPostPublished(post))
      return res.status(404).json({ error: "not found" });
    return res.status(200).json(post);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end("Method Not Allowed");
}
