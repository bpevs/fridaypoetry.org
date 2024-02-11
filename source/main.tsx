/** @jsx jsx **/
import { Hono } from "hono";
import { jsx, logger, poweredBy, serveStatic } from "hono/middleware.ts";

import { createPoem, deletePoem, getAllPoems, getPoem } from "./database.ts";
import Client from "./components/html.tsx";
import { ROUTE } from "./constants.ts";
import type { Poem } from "./types.ts";

const { ABOUT, READ, WRITE } = ROUTE;
const app = new Hono();

app.use("*", logger(), poweredBy());

app.get("/", async (c) => {
  try {
    const { id } = (await getPoem()) || {}; // latest poem
    return id
      ? c.redirect(`/poems/${id}`, 302)
      : c.html(<Client route={WRITE} />, 302);
  } catch (e) {
    console.error(e);
  }
});

app.get(
  "/poems/:id",
  async (c) => {
    const poem = await getPoem(c.req.param("id"));
    return c.html(<Client route={READ} poem={poem} />);
  },
);
app.get("/about", (c) => c.html(<Client route={ABOUT} />));
app.get("/new", (c) => c.html(<Client route={WRITE} />));

app.get("/api/poems", async (c) => {
  const poems: { [key: string]: Poem } = {};
  for await (const entry of getAllPoems()) {
    poems[String(entry.key)] = entry.value;
  }
  return c.json(poems, 200);
});

app.get(
  "/api/poems/:id",
  async (c) => c.json(await getPoem(c.req.param("id"))),
);

app.get("/api/poems/:id/delete/:key", async (c) => {
  if (
    Deno.env.get("DELETE_KEY") &&
    Deno.env.get("DELETE_KEY") === c.req.param("key")
  ) {
    await deletePoem(c.req.param("id"));
    return c.text("success!", 200);
  }
});

app.post("/api/poems", async (c) => {
  const body = await c.req.parseBody();
  if (!body.content) return c.text("No poem content", 400);

  await createPoem({
    id: null,
    published: Date.now(),
    content: String(body.content),
    author: body.author ? String(body.author) : undefined,
    title: body.title ? String(body.title) : undefined,
  });
  return c.redirect("/", 302);
});

app.get("/index.css", serveStatic({ path: "./public/index.css" }));
app.get("/manifest.json", serveStatic({ path: "./public/manifest.json" }));
app.use("/assets/*", serveStatic({ root: "./public/" }));

Deno.serve(app.fetch);
