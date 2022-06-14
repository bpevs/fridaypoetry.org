/* @jsx h */
import { Fragment, h } from "preact";

import { isFridaySomewhere, ROUTE } from "../constants.ts";
import About from "../routes/about.tsx";
import Read from "../routes/read.tsx";
import Write from "../routes/write.tsx";
import Only from "./only.tsx";

import type { Poem } from "../types.ts";

const { ABOUT, READ, WRITE } = ROUTE;

export interface AppProps {
  route: string;
  poem?: Poem;
}

const pageTurnScript = `
  document.addEventListener('keydown', (e) => {
    switch (e.which) {
      case 37: // left
        const previous = document.getElementById("previous").href;
        if (!/null$/.test(previous)) window.location.href = previous;
        break;

      case 39: // right
        const next = document.getElementById("next").href;
        if (!/null$/.test(next)) window.location.href = next;
        break;
    }
  });
`;

export default function App({ route, poem }: AppProps) {
  return (
    <Fragment>
      <nav>
        <Only if={isFridaySomewhere() && route !== WRITE}>
          <div className="friday-message">
            It's Friday! <a href="/new">Write a Poem!</a>
          </div>
        </Only>
        <Only if={route !== READ}>
          <a href="javascript:history.back()">Back</a>
        </Only>
      </nav>
      <Only if={route === ABOUT}>
        <About />
      </Only>
      <Only if={route === READ}>
        <Read poem={poem} />
      </Only>
      <Only if={route === WRITE}>
        <Write />
      </Only>
      <footer>
        <Only if={route !== ABOUT}>
          <a href="/about">About FridayPoetry.org</a>
          {" "}–{" "}
          <a
            href="/friday-poetry-reminder.ics"
            target="_BLANK"
            download="Friday Poetry Reminder Calendar"
          >
            Friday Reminder Calendar
          </a>
        </Only>
      </footer>
      <Only if={route === READ}>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: pageTurnScript }}
        />
      </Only>
    </Fragment>
  );
}
