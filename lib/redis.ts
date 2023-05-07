import { connect } from "redis";

export const redis = await connect({
  hostname: String(Deno.env.get("REDIS_HOSTNAME")),
  port: Deno.env.get("REDIS_PORT"),
  password: Deno.env.get("REDIS_PASSWORD"),
});
