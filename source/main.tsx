/* @jsx h */

import { app, contentType, get, post } from "dinatra";
import { h } from "preact";
import render from "preact-render-to-string";

import { getPoem, getPoems, postPoem } from "./utilities/database.ts";
import Client from "./client.jsx";
import { ROUTE } from "./constants.ts";

const { ABOUT, READ, WRITE } = ROUTE;

const wrap = (content: string) => `<!DOCTYPE html>${content}`;

app(
  get("/", async () => {
    return wrap(render(<Client route={READ} poem={await getPoem()} />));
  }),
  get("/about", () => wrap(render(<Client route={ABOUT} />))),
  get("/poems/new", () => wrap(render(<Client route={WRITE} />))),
  get("/poems/:id", async ({ params }) => {
    const poem = await getPoem(params.id);
    return wrap(render(<Client route={READ} poem={poem} />));
  }),
  get("/api/poems", async () => [
    200,
    contentType("json"),
    await JSON.stringify({ poems: [samplePoem] }),
  ]),
  get("/api/poems/:id", async () => [
    200,
    contentType("json"),
    await JSON.stringify(samplePoem),
  ]),
  post("/api/poems", async ({ params }) => {
    await postPoem();
  }),
  get("/error", () => [500, "an error has occured"]),
);
