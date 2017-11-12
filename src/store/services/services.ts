import axios, { AxiosResponse } from "axios";
import { assign, identity, map, pick, toArray } from "lodash";
import { BASE_URL } from "../../constants";
import { Poem } from "../../types";


export function createPoem(poem: any) {
  const IS_FRIDAY = (new Date()).getDay() === 5;

  if (!IS_FRIDAY) {
    alert("Oops! We can't submit this poem! It's not Friday!");
    return Promise.reject("It's not Friday!");
  }

  if (!poem.text || (typeof poem.text !== "string")) {
    return Promise.reject("No Poem text!");
  }

  const poemData = pick(poem, [ "author", "text", "title" ]);
  return axios.post(`${BASE_URL}.json`, poemData)
    .then((response: AxiosResponse) => ({ poemId: response.data.name }));
}

export function fetchPoemIds() {
  return axios.get(`${BASE_URL}.json?shallow=true`)
    .then((response: AxiosResponse) => {
      const ids = Object.keys(response.data).sort().reverse();
      return { ids };
    });
}

export function fetchPoem(poemId: string) {
  return axios.get(`${BASE_URL}/${poemId}.json`)
    .then((response: AxiosResponse) => ({ poem: response.data }));
}
