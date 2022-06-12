/* @jsx h */
import { h, VNode } from "preact";

import { ROUTE } from "./constants.ts";
import { Poem } from "./types.ts";

import About from "./routes/about.tsx";
import Read from "./routes/read.tsx";
import Write from "./routes/write.tsx";

const { ABOUT, READ, WRITE } = ROUTE;

function Only({ if: predicate, children }: {
  if: boolean;
  // deno-lint-ignore no-explicit-any
  children: VNode<any>;
}) {
  return predicate ? children : null;
}

export default function Html({ route, poems }: { route: string; poems?: Poem[] }) {
  return (
    <html lang="en">
      <head>
        <title>Friday Poetry</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Poetry on Fridays" />
        <meta name="theme-color" content="#000000" />
        <meta name="title" content="Friday Poetry" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" type="text/css" href="/index.css" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </head>
      <body>
        <Only if={route === ABOUT}>
          <About />
        </Only>
        <Only if={route === READ}>
          <Read poems={poems} />
        </Only>
        <Only if={route === WRITE}>
          <Write />
        </Only>
      </body>
    </html>
  );
}
