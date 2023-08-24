/* @jsx h */
import { Application, Router } from "oak";
import { h } from "preact";
import render from "preact-render-to-string";

import { createPoem, deletePoem, getAllPoems, getPoem } from "./database.ts";
import Client, { wrap } from "./components/html.tsx";
import { ROUTE } from "./constants.ts";
import type { Poem } from "./types.ts";

const { ABOUT, READ, WRITE } = ROUTE;

const pages = new Router()
  .get("/", async (ctx) => {
    try {
      const { id } = (await getPoem()) || {}; // latest poem
      if (id) {
        ctx.response.status = 302;
        ctx.response.redirect(`/poems/${id}`);
      } else {
        ctx.response.status = 403;
        ctx.response.body = wrap(render(<Client route={WRITE} />));
      }
    } catch (e) {
      console.error(e);
    }
  })
  .get("/poems/:id", async (ctx) => {
    ctx.response.body = wrap(
      render(<Client route={READ} poem={await getPoem(ctx.params.id)} />),
    );
  })
  .get("/about", (ctx) => {
    ctx.response.body = wrap(render(<Client route={ABOUT} />));
  })
  .get("/new", (ctx) => {
    ctx.response.status = 403;
    ctx.response.body = wrap(render(<Client route={WRITE} />));
  });

const poems = new Router()
  // For Export; no expectation of performance
  .get("/api/poems", async (ctx) => {
    ctx.response.type = "application/json";
    const poems: { [key: string]: Poem } = {};
    for await (const entry of getAllPoems()) {
      poems[String(entry.key)] = entry.value;
    }
    ctx.response.body = JSON.stringify(poems);
  })
  .get("/api/poems/:id", async (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.body = JSON.stringify(await getPoem(ctx?.params?.id));
  })
  .get("/api/poems/:id/delete/:key", async (ctx) => {
    if (
      Deno.env.get("DELETE_KEY") &&
      Deno.env.get("DELETE_KEY") === ctx?.params?.key
    ) {
      await deletePoem(ctx?.params?.id);
      ctx.response.status = 200;
    }
  })
  .post("/api/poems", async (ctx) => {
    const body = await (ctx.request.body({ type: "form" })).value;
    const content = body.get("content");
    if (!content) {
      ctx.response.status = 400;
    } else {
      await createPoem({
        id: null,
        published: Date.now(),
        content,
        author: body.get("author") || undefined,
        title: body.get("title") || undefined,
      });
      ctx.response.status = 302;
      ctx.response.redirect("/");
    }
  });

console.log("listening on http://localhost:8080");

await new Application()
  .use(pages.routes())
  .use(poems.routes())
  .use(async (ctx, next) => {
    try {
      await ctx.send({ root: `${Deno.cwd()}/public` });
    } catch {
      await next();
    }
  })
  .listen({ port: 8080 });
