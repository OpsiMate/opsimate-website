import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const common = [
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
  ];
  const isProd = process.env.NODE_ENV === "production";
  const expiredAdmin = [
    "admin_token=",
    ...common,
    "HttpOnly",
    isProd ? "Secure" : undefined,
  ]
    .filter(Boolean)
    .join("; ");
  const expiredCsrf = ["admin_csrf=", ...common, isProd ? "Secure" : undefined]
    .filter(Boolean)
    .join("; ");
  res.setHeader("Set-Cookie", [expiredAdmin, expiredCsrf]);
  return res.status(200).json({ ok: true });
}
