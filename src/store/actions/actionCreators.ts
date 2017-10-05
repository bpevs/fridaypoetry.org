import * as services from "../services/services";
import * as types from "./actionTypes";

interface Poem {
  author: string;
  text: string;
  id: string;
}

export function createPoem(poem: Poem) {
  return {
    callAPI() { return services.createPoem(poem); },
    payload: { poem },
    types: [
      types.CREATE_POEM_REQUEST,
      types.CREATE_POEM_SUCCESS,
      types.CREATE_POEM_FAILURE
    ]
  };
}

export function fetchPoem(poemId: number) {
  return {
    callAPI() { return services.fetchPoem(poemId); },
    payload: { poemId },
    types: [
      types.FETCH_POEM_REQUEST,
      types.FETCH_POEM_SUCCESS,
      types.FETCH_POEM_FAILURE
    ]
  };
}

export function fetchPoemSuccess(poem: Poem) {
  const type = types.FETCH_POEM_SUCCESS;
  return {
    payload: {
      poem,
      poemId: poem.id
    },
    type
  };
}

export function fetchPoems(startId?: number) {
  return {
    callAPI() { return services.fetchPoems(startId); },
    payload: {},
    types: [
      types.FETCH_POEMS_REQUEST,
      types.FETCH_POEMS_SUCCESS,
      types.FETCH_POEMS_FAILURE
    ]
  };
}
