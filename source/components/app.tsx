/* @jsx h */
import { h, Fragment } from "preact";

import { ROUTE } from "../constants.ts";
import About from "../routes/about.tsx";
import Read from "../routes/read.tsx";
import Write from "../routes/write.tsx";
import Only from "./only.tsx";

import type { Poem } from "../types.ts";

const { ABOUT, READ, WRITE } = ROUTE;

export const wrap = (content: string) => `<!DOCTYPE html>${content}`;

export interface AppProps {
  route: string;
  poems?: Poem[];
}

export default function App({ route, poems }: AppProps) {
  return (
    <Fragment>
      <Only if={route === ABOUT}>
        <About />
      </Only>
      <Only if={route === READ}>
        <Read poems={poems} />
      </Only>
      <Only if={route === WRITE}>
        <Write />
      </Only>
    </Fragment>
  );
}
