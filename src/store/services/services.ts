import { assign, identity, map, pick, toArray } from "lodash";
const baseUrl = "https://friday-poetry.firebaseio.com/poems";
import { Poem } from "../../types";


export function createPoem(poem: any) {
  const date = Date.now();
  const poemData = pick(poem, [ "author", "text", "title" ]);

  return fetch(baseUrl, {
    body: JSON.stringify(assign(poemData, { date })),
    headers: new Headers({ "Content-Type": "application/json" }),
    method: "POST"
  });
}

export function fetchPoemIds() {
  return fetch(`${baseUrl}.json?shallow=true`)
    .then((response) => response.json())
    .then((data: any) => {
      const ids = Object.keys(data).sort().reverse();
      return { ids };
    });
}

export function fetchPoem(poemId: string) {
  return fetch(`${baseUrl}/${poemId}.json`)
    .then((response) => response.json())
    .then((poem: Poem) => ({ poem }));
}

export function fetchPoems(poemId?: string) {
  return Promise.resolve();
}
