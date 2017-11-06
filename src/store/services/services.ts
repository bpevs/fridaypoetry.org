import axios, { AxiosResponse } from "axios";
import { assign, identity, map, pick, toArray } from "lodash";
const baseUrl = "https://friday-poetry.firebaseio.com/poems";
import { Poem } from "../../types";


export function createPoem(poem: any) {
  const date = Date.now();
  const poemData = pick(poem, [ "author", "text", "title" ]);
  return axios.post(baseUrl, poemData);
}

export function fetchPoemIds() {
  return axios.get(`${baseUrl}.json?shallow=true`)
    .then((response: AxiosResponse) => {
      const ids = Object.keys(response.data).sort().reverse();
      return { ids };
    });
}

export function fetchPoem(poemId: string) {
  return axios.get(`${baseUrl}/${poemId}.json`)
    .then((response: AxiosResponse) => ({ poem: response.data }));
}
