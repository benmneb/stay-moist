// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[post].tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/add-post.tsx";
import * as $3 from "./routes/api/log-out.ts";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/log-in.tsx";
import * as $$0 from "./islands/add-post.tsx";
import * as $$1 from "./islands/vote-buttons.tsx";

const manifest = {
  routes: {
    "./routes/[post].tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/add-post.tsx": $2,
    "./routes/api/log-out.ts": $3,
    "./routes/index.tsx": $4,
    "./routes/log-in.tsx": $5,
  },
  islands: {
    "./islands/add-post.tsx": $$0,
    "./islands/vote-buttons.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
