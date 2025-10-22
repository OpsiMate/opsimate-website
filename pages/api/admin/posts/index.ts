import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

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

    const url = `${base}/api/posts`;
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-token": adminToken,
      },
      body: JSON.stringify(req.body ?? {}),
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

