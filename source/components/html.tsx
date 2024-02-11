/** @jsx jsx **/
import { jsx } from "hono/middleware.ts";
import { html } from "hono/helper.ts";

import { ROUTE } from "../constants.ts";
import { Poem } from "../types.ts";

import About from "../routes/about.tsx";
import Read from "../routes/read.tsx";
import Write from "../routes/write.tsx";
import App, { AppProps } from "./app.tsx";

const { ABOUT, READ, WRITE } = ROUTE;

export default function Html(props: { route: string; poem?: Poem }) {
  return html`
  <!DOCTYPE html>
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
      <meta property="og:url" content="http://fridaypoetry.org" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Friday Poetry" />
      <meta
        property="og:description"
        content="For writing poetry. On Friday. 📃✍️"
      />
      <meta property="og:image" content="/assets/og_image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="350" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" type="text/css" href="/index.css" />
      <link rel="shortcut icon" href="/assets/favicon.ico" />
    </head>
    <body>
      ${<App {...props} />}
    </body>
  </html>
`;
}
