import axios from "axios";
import { pick } from "lodash";
import { BASE_URL } from "../../config";


export function createPoem(poem) {
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
    .then((response) => ({ poemId: response.data.name }));
}

export function fetchPoemIds() {
  return axios.get(`${BASE_URL}.json?shallow=true`)
    .then((response) => {
      const ids = Object.keys(response.data).sort().reverse();
      return { ids };
    });
}

export function fetchPoem(poemId) {
  return axios.get(`${BASE_URL}/${poemId}.json`)
    .then((response) => ({ poem: response.data }));
}
