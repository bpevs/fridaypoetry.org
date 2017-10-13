import { assign, identity, map, pick, toArray } from "lodash";
const baseUrl = "https://friday-poetry.firebaseio.com/poems";
import { Poem } from "../../types";
import { get, post } from "axios";


export function createPoem(poem: any) {
  const date = Date.now();
  const poemData = pick(poem, [ "author", "text", "title" ]);
  return post(baseUrl, poemData);
}

export function fetchPoemIds() {
  return get(`${baseUrl}.json?shallow=true`)
    .then((data: any) => {
      const ids = Object.keys(data).sort().reverse();
      return { ids };
    });
}

export function fetchPoem(poemId: string) {
  return get(`${baseUrl}/${poemId}.json`)
    .then((poem: Poem) => ({ poem }));
}

export function fetchPoems(poemId?: string) {
  return Promise.resolve();
}
