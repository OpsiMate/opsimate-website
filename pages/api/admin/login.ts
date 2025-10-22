import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const { token } = (req.body as any) || {};
  if (typeof token !== "string" || !token) {
    return res.status(400).json({ error: "token is required" });
  }
  if (token !== adminToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const isProd = process.env.NODE_ENV === "production";
  const cookie = [
    `admin_token=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${60 * 60 * 24 * 30}`,
    isProd ? "Secure" : undefined,
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ ok: true });
}
