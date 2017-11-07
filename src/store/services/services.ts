import axios, { AxiosResponse } from "axios";
import { assign, identity, map, pick, toArray } from "lodash";
const baseUrl = "https://friday-poetry.firebaseio.com/poems";
import { Poem } from "../../types";


export function createPoem(poem: any) {
  const date = new Date();
  const isNotFriday = date.getDay() !== 6;

  if (isNotFriday) {
    alert("Oops! We can't submit this poem! It's not Friday!");
    return Promise.reject("It's not Friday!");
  }

  const poemData = pick(poem, [ "author", "text", "title" ]);
  return axios.post(`${baseUrl}.json`, poemData)
    .then((response: AxiosResponse) => ({ poemId: response.data.name }));
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
