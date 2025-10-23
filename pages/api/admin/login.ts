import type { NextApiRequest, NextApiResponse } from "next";
import { timingSafeEqual, randomBytes } from "crypto";

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
  const a = Buffer.from(token);
  const b = Buffer.from(adminToken);
  const isMatch = a.length === b.length && timingSafeEqual(a, b);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const isProd = process.env.NODE_ENV === "production";
  const maxAge = 60 * 60 * 24 * 30;
  const csrfToken = randomBytes(32).toString("hex");

  const adminTokenCookie = [
    `admin_token=${encodeURIComponent(token)}`,
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    isProd ? "Secure" : undefined,
  ]
    .filter(Boolean)
    .join("; ");

  const adminCsrfCookie = [
    `admin_csrf=${encodeURIComponent(csrfToken)}`,
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
    isProd ? "Secure" : undefined,
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", [adminTokenCookie, adminCsrfCookie]);
  return res.status(200).json({ ok: true });
}
