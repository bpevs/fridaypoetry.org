/* @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import type { Poem } from "../types.ts";

const DIRECTION = { PREV: "PREV", NEXT: "NEXT" };
const { PREV, NEXT } = DIRECTION;

export default function Read({ poem }: { poem?: Poem }) {
  if (!poem) return <div className="no-content">No Content</div>;

  const { author, content, title, next, prev, published } = poem;

  // Get closest friday.
  const date = new Date(published);
  date.setDate(date.getDate() + 5 - date.getDay());

  const publishedDate = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join(".");

  return (
    <main className="poem-container">
      <div className="poem">
        {title ? <h1>{title}</h1> : null}

        <p className="content">{content}</p>

        <p>
          <em className="author">- {author || "Anonymous"}</em>
          , <span className="publish">{publishedDate}</span>
        </p>

        <p>
          <PageTurn direction={PREV} id={prev} />
          <PageTurn direction={NEXT} id={next} />
        </p>
      </div>
    </main>
  );
}

function PageTurn({ direction = PREV, id }: {
  direction: string;
  id?: string;
}) {
  const name = direction === PREV ? "previous" : "next";
  return (
    <a href={`/poems/${id}`} id={name} className="page-turn">
      <button disabled={!id}>{name}</button>
    </a>
  );
}
