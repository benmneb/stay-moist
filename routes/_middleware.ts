import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { redis } from "/lib/redis.ts";

// TODO: THIS IS WRONG
type User = {
  id: number;
  name: string;
  access_token: string;
  email: string;
};

export type ServerState = {
  user: User | null;
  error: { code: number; msg: string } | null;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;

  const headers = new Headers();
  headers.set("location", "/");

  if (access_token) {
    const session = await redis.get(access_token);

    if (!session) {
      return new Response(null, { headers, status: 303 });
    }

    const user = JSON.parse(session!.toString())?.user;
    ctx.state.user = user;
  }

  return await ctx.next();
}
