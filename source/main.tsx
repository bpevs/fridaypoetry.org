/* @jsx h */

import { App, contentType, get, post, redirect } from "dinatra";
import { h } from "preact";
import render from "preact-render-to-string";

import { createPoem, getAllPoems, getPoem } from "./database.ts";
import Client, { wrap } from "./components/html.tsx";
import { ROUTE } from "./constants.ts";

const { ABOUT, READ, WRITE } = ROUTE;

const app = new App(8080, true);

app.register(
  get(
    "/",
    async () => {
      const { id } = (await getPoem()) || {}; // latest poem
      return id ? redirect(`/poems/${id}`, 302) : 404;
    },
  ),
  get("/about", () => wrap(render(<Client route={ABOUT} />))),
  get("/new", () => wrap(render(<Client route={WRITE} />))),
  get(
    "/poems/:id",
    async ({ params }) =>
      wrap(render(<Client route={READ} poem={await getPoem(params.id)} />)),
  ),
  get("/api/poems", async () => [
    200,
    contentType("json"),
    JSON.stringify(await getAllPoems()),
  ]),
  get("/api/poems/:id", async ({ params }) => [
    200,
    contentType("json"),
    JSON.stringify(await getPoem(params.id)),
  ]),
  post("/api/poems", async ({ params }) => {
    await createPoem({
      id: null,
      content: params.content,
      published: params.published,
      author: params.author,
      title: params.title,
    });
    return redirect("/", 302);
  }),
  get("/error", () => [500, "an error has occured"]),
);

app.serve();

console.log("listening on http://localhost:8080");
