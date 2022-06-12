/* @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import type { Poem } from "../types.ts";

export default function Read({ poems }: { poems?: Poem[] }) {
  const [currPoemIndex, setCurrPoemIndex] = useState<number>(0);
  const currPoem = poems?.[currPoemIndex];

  const prevPoemId = poems[Math.max(currPoemIndex - 1, 0)]?.id;
  const nextPoemId = poems[Math.min(currPoemIndex + 1, poems.length)]?.id;

  if (!currPoem) return <div className="no-content">No Content</div>;

  const { author, content, title } = currPoem;

  return (
    <main style="margin: auto; max-width: 500px;">
      {title ? <h1>{title}</h1> : null}

      <p style="white-space:pre-wrap;">{content}</p>

      {author ? <p className="author">- {author}</p> : null}

      <PageTurn direction="left" id={prevPoemId} />
      <PageTurn direction="right" id={nextPoemId} />
    </main>
  );
}

function PageTurn({ direction = "left", id }: {
  direction: string;
  id: string;
}) {
  return <a href={`/poems/${id}`}><button disabled={!Boolean(id)}>turn page {direction}</button></a>;
}
