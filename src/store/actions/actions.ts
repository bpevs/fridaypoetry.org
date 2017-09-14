import * as services from "../services/services";
import * as types from "./actionTypes";

interface Poem {
  author: string,
  text: string,
  id: string
}

export function createPoem(poem: Poem) {
  return {
    types: [
      types.CREATE_POEM_REQUEST,
      types.CREATE_POEM_SUCCESS,
      types.CREATE_POEM_FAILURE
    ],
    callAPI() { return services.createPoem(poem); },
    payload: { poem }
  };
}

export function fetchPoem(poemId: string) {
  return {
    types: [
      types.FETCH_POEM_REQUEST,
      types.FETCH_POEM_SUCCESS,
      types.FETCH_POEM_FAILURE
    ],
    callAPI() { return services.fetchPoem(poemId); },
    payload: { poemId }
  };
}

export function fetchPoemSuccess(poem: Poem) {
  const type = types.FETCH_POEM_SUCCESS;
  return {
    type: type,
    payload: {
      poem: poem,
      poemId: poem.id
    }
  };
}

export function fetchPoems() {
  return {
    types: [
      types.FETCH_POEMS_REQUEST,
      types.FETCH_POEMS_SUCCESS,
      types.FETCH_POEMS_FAILURE
    ],
    callAPI() { return services.fetchPoems(); },
    payload: {}
  };
}
