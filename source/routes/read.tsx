/* @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import type { Poem } from "../types.ts";

export default function Read({ poems }: { poems?: Poem[] }) {
  const currPoem = poems?.[0];

  if (!currPoem) return <div className="no-content">No Content</div>;

  const { author, content, title } = currPoem;

  return (
    <main style="margin: auto; max-width: 500px;">
      {title ? <h1>{title}</h1> : null}

      <p style="white-space:pre-wrap;">{content}</p>

      {author ? <p className="author">- {author}</p> : null}

      <PageTurn direction="left" id={currPoem.prev} />
      <PageTurn direction="right" id={currPoem.next} />
    </main>
  );
}

function PageTurn({ direction = "left", id }: {
  direction: string;
  id: string;
}) {
  return (
    <a href={`/poems/${id}`}>
      <button disabled={!id}>turn page {direction}</button>
    </a>
  );
}
