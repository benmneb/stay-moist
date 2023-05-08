/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import "$std/dotenv/load.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "./twind.config.ts";

import { redis } from "/lib/redis.ts";
import { supabase } from "/lib/supabase.ts";

supabase.auth.onAuthStateChange(async (event, session) => {
  if (
    event === "SIGNED_IN" || event === "TOKEN_REFRESHED" && session !== null
  ) {
    const { access_token, expires_in } = session!;
    const stringified = JSON.stringify(session);
    await redis.set(access_token, stringified, { ex: expires_in });
  }
});

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
