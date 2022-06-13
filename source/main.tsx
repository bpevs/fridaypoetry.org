/* @jsx h */

import { App, contentType, get, post, redirect } from "dinatra";
import { h } from "preact";
import render from "preact-render-to-string";

import { getPoem, getRecentPoems, postPoem } from "./database.ts";
import Client, { wrap } from "./components/app.tsx";
import { ROUTE } from "./constants.ts";

const { ABOUT, READ, WRITE } = ROUTE;

const app = new App(8080, true);

app.register(
  get(
    "/",
    async () => {
      const recentPoems = await getRecentPoems();
      const poemId = recentPoems[0].id;
      return redirect(`/poems/${poemId}`, 302);
    },
  ),
  get("/about", () => wrap(render(<Client route={ABOUT} />))),
  get("/new", () => wrap(render(<Client route={WRITE} />))),
  get(
    "/poems/:id",
    async ({ params }) =>
      wrap(render(<Client route={READ} poems={[await getPoem(params.id)]} />)),
  ),
  get("/api/poems", async () => [
    200,
    contentType("json"),
    JSON.stringify({ poems: await getRecentPoems() }),
  ]),
  get("/api/poems/:id", async ({ params }) => [
    200,
    contentType("json"),
    JSON.stringify(await getPoem(params.id)),
  ]),
  post("/api/poems", async ({ params }) => {
    await postPoem(params);
    return redirect("/", 302);
  }),
  get("/error", () => [500, "an error has occured"]),
);

app.serve();

console.log("listening on http://localhost:8080");
