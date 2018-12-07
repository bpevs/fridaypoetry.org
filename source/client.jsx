/* @jsx h */
import { h } from "preact";

import { ROUTE } from "./constants.ts";
import Only from "./components/only.tsx";

import About from "./routes/about.tsx";
import Read from "./routes/read.tsx";
// import Write from "./routes/write.tsx";

const { ABOUT, READ, WRITE } = ROUTE;

export default function Html({ route, ...props }) {
  console.log(route);
  return (
    <html lang="en">
      <head>
        <title>Friday Poetry</title>
        <meta charset="utf-8" />
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
          <Read {...props} />
        </Only>
        <Only if={route === WRITE}>write</Only>
      </body>
    </html>
  );
}
