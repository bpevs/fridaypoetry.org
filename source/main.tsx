/* @jsx h */

import { App, contentType, get, post, redirect } from "dinatra";
import { h } from "preact";
import render from "preact-render-to-string";

import { getPoem, getRecentPoems, postPoem } from "./database.ts";
import Client from "./client.tsx";
import { ROUTE } from "./constants.ts";

const { ABOUT, READ, WRITE } = ROUTE;

const wrap = (content: string) => `<!DOCTYPE html>${content}`;

const app = new App(8080, true);

const samplePoem = {
  id: "0",
  author: "Trav-f-isnt-is",
  text:
    "We work while young and healthy,\noft too much to enjoy a break,\nand all for the goal of being wealthy,\nnever asking what's really at stake.\nOur value defined by what we earn,\nno job? no money? no place for you here,\nyet for material goods, our souls don't yearn,\nbut rather connection, compassion, it's clear.\nOur best years given to some company for money,\nwhich all gets spent to heal the damage done\nby that very job that slowly killed us, it's funny,\nand sad, and obvious, and in the end no one's won.\nWe all know this, and this is how it will always be,\nwithout some intervention, perhaps a catastrophe,\nyet the bravest of us can break free, individually,\nand perhaps get others asking, is this how it should be?",
  title: "Should it be",
};

app.register(
  get(
    "/",
    async () => wrap(render(<Client route={READ} poems={await getRecentPoems()} />)),
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
    await JSON.stringify({ poems: [samplePoem] }),
  ]),
  get("/api/poems/:id", async () => [
    200,
    contentType("json"),
    await JSON.stringify(samplePoem),
  ]),
  post("/api/poems", ({ params }) => {
    postPoem(params);
    return redirect("/", 302);
  }),
  get("/error", () => [500, "an error has occured"]),
);

app.serve();

console.log("listening on http://localhost:8080");
