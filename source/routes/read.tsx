/* @jsx h */
import { h } from "preact";
import { useCallback } from "preact/hooks";
import type { Poem } from "../types.ts";

export default function Read({ poem }: { poem?: Poem }) {
  const onClick = useCallback(() => {
  }, [poem]);

  if (!poem) return <div className="no-content" />;

  const { author, text, title } = poem;

  return (
    <main style="margin: auto; max-width: 500px;">
      {title ? <h1>title</h1> : null}

      <p style="white-space:pre-wrap;">{poem.text}</p>

      {author ? <p className="author">- {author}</p> : null}

      <PageTurn onClick={onClick} disabled={false} direction="left" />
      <PageTurn onClick={onClick} disabled={false} direction="right" />
    </main>
  );
}

function PageTurn({ onClick, disabled = false, direction = "left" }: {
  onClick: any;
  disabled: boolean;
  direction: string;
}) {
  return <button>turn page</button>;
}
