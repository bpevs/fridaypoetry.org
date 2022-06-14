/* @jsx h */

import { Application, Router } from "oak";
import { h } from "preact";
import render from "preact-render-to-string";

import { createPoem, getAllPoems, getPoem } from "./database.ts";
import Client, { wrap } from "./components/html.tsx";
import { ROUTE } from "./constants.ts";

const { ABOUT, READ, WRITE } = ROUTE;

const pages = new Router()
  .get("/", async (ctx) => {
    const { id } = (await getPoem()) || {}; // latest poem
    if (id) {
      ctx.response.status = 302;
      ctx.response.redirect(`/poems/${id}`);
    } else {
      ctx.response.status = 404;
    }
  })
  .get("/poems/:id", async (ctx) => {
    ctx.response.body = wrap(
      render(<Client route={READ} poem={await getPoem(ctx.params.id)} />)
    );
  })
  .get("/about", (ctx) => {
    ctx.response.body = wrap(render(<Client route={ABOUT} />));
  })
  .get("/new", (ctx) => {
    ctx.response.body = wrap(render(<Client route={WRITE} />));
  });

const poems = new Router()
  .get("/api/poems", async (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.body = JSON.stringify(await getAllPoems());
  })
  .get("/api/poems/:id", async (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.body = JSON.stringify(await getPoem(ctx?.params?.id));
  })
  .post("/api/poems", async (ctx) => {
    const { content, author, title } = ctx?.params || {};
    if (!content) {
      ctx.response.status = 500;
    } else {
      const published = Date.now();
      await createPoem({ id: null, published, content, author, title });
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

