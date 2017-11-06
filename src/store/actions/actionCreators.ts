import { Poem } from "../../types";
import * as services from "../services/services";
import * as types from "./actionTypes";


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

export function fetchPoem(poemId: string) {
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

export function fetchPoemSuccess(poem: Poem, poemId: string) {
  const type = types.FETCH_POEM_SUCCESS;
  return {
    payload: { poem, poemId },
    type
  };
}

export function fetchPoemIds() {
  return {
    callAPI() { return services.fetchPoemIds(); },
    types: [
      types.FETCH_IDS_REQUEST,
      types.FETCH_IDS_SUCCESS,
      types.FETCH_IDS_FAILURE
    ]
  };
}
