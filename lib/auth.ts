import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

const ADMIN_COOKIE_NAME = "admin_token";

function parseCookieHeader(header: string | undefined, name: string) {
  if (!header) return undefined;
  try {
    const parts = header.split(/;\s*/).map((p) => p.split("="));
    const match = parts.find(([k]) => k === name)?.[1];
    return match;
  } catch {
    return undefined;
  }
}

export function getAdminCookieToken(ctx: GetServerSidePropsContext) {
  const header = ctx.req.headers.cookie || "";
  const fromReq = (ctx.req as any).cookies?.[ADMIN_COOKIE_NAME] as
    | string
    | undefined;
  return fromReq ?? parseCookieHeader(header, ADMIN_COOKIE_NAME);
}

export function isAdminAuthenticated(ctx: GetServerSidePropsContext) {
  const token = process.env.ADMIN_TOKEN;
  const cookieToken = getAdminCookieToken(ctx);
  return Boolean(token && cookieToken === token);
}

export async function requireAdminPage(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, never>>> {
  if (!isAdminAuthenticated(ctx)) {
    return {
      redirect: { destination: "/blog/admin/login", permanent: false },
    } as any;
  }
  return { props: {} };
}

export async function getAdminLoginProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ loggedIn: boolean }>> {
  const loggedIn = isAdminAuthenticated(ctx);
  return { props: { loggedIn } } as any;
}

