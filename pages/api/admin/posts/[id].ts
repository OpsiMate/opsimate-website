import type { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  if (req.method !== "PUT" && req.method !== "DELETE") {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end("Method Not Allowed");
  }

  if (!requireAuth(req, res)) return;

  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return res
      .status(500)
      .json({ error: "Server misconfigured: ADMIN_TOKEN not set" });
  }

  try {
    const proto = (req.headers["x-forwarded-proto"] as string) || "http";
    const host = req.headers.host;
    const base = `${proto}://${host}`;

    const url = `${base}/api/posts/${encodeURIComponent(id)}`;
    const upstream = await fetch(url, {
      method: req.method,
      headers: {
        "content-type": "application/json",
        "x-admin-token": adminToken,
      },
      body: req.method === "PUT" ? JSON.stringify(req.body ?? {}) : undefined,
    });

    const ct = upstream.headers.get("content-type") || "";
    const status = upstream.status;
    if (ct.includes("application/json")) {
      const data = await upstream.json();
      return res.status(status).json(data);
    } else {
      const text = await upstream.text();
      return res.status(status).send(text);
    }
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: e?.message || "failed to perform operation" });
  }
}
