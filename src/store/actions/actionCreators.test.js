jest.mock("axios");

import { callApiMiddleware } from "@zuck/core";
import configureStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { createPoem, fetchPoem, fetchPoemIds, fetchPoemSuccess } from "./actionCreators";
import * as actionTypes from "./actionTypes";

const middlewares = [ callApiMiddleware, thunkMiddleware ];
const mockStore = configureStore(middlewares);


test("Should execute createPoem if it's friday", () => {
  Date.prototype.getDay = () => 5;
  const poem = {
    author: null,
    text: "my poem of success that is successful",
    title: "success-poem"
  };

  const store = mockStore({});

  return store.dispatch(createPoem(poem))
    .then(() => {
      const [ poemRequest, poemSuccess ] = store.getActions();

      expect(poemRequest.type).toEqual(actionTypes.CREATE_POEM_REQUEST);
      expect(poemRequest.payload.poem).toEqual(poem);

      expect(poemSuccess.type).toEqual(actionTypes.CREATE_POEM_SUCCESS);
      expect(poemSuccess.payload.poem).toEqual(poem);
    });
});

test("Should fail createPoem if it's not friday", () => {
  Date.prototype.getDay = () => 4;
  const poem = {
    author: null,
    text: "my poem of success that is successful",
    title: "success-poem"
  };

  const store = mockStore({});

  return store.dispatch(createPoem(poem))
    .then(() => {
      const [ poemRequest, poemFailure ] = store.getActions();

      expect(poemRequest.type).toEqual(actionTypes.CREATE_POEM_REQUEST);
      expect(poemRequest.payload.poem).toEqual(poem);

      expect(poemFailure.type).toEqual(actionTypes.CREATE_POEM_FAILURE);
      expect(poemFailure.payload.poem).toEqual(poem);
    });
});

test("Should execute fetchPoem", () => {
  const poemId = "success-poem";
  const store = mockStore({});

  return store.dispatch(fetchPoem(poemId))
    .then(() => {
      const [ poemRequest, poemSuccess ] = store.getActions();

      expect(poemRequest.type).toEqual(actionTypes.FETCH_POEM_REQUEST);
      expect(poemRequest.payload.poemId).toEqual(poemId);
      expect(poemRequest.payload.poem).toBeUndefined();

      expect(poemSuccess.type).toEqual(actionTypes.FETCH_POEM_SUCCESS);
      expect(poemSuccess.payload.poemId).toEqual(poemId);
      expect(poemSuccess.payload.poem).toBeDefined();
    });
});

test("Should execute fetchPoemIds", () => {
  const store = mockStore({});

  return store.dispatch(fetchPoemIds())
    .then(() => {
      const [ idsRequest, idsSuccess ] = store.getActions();

      expect(idsRequest.type).toEqual(actionTypes.FETCH_IDS_REQUEST);
      expect(idsSuccess.type).toEqual(actionTypes.FETCH_IDS_SUCCESS);
      expect(idsSuccess.payload.ids.length).toBeGreaterThan(0);
    });
});

test("Should execute fetchPoemSuccess synchronously", () => {
  const poem = {
    author: null,
    text: "my poem of success that is successful",
    title: "success-poem"
  };
  const poemId = "success-poem";
  const store = mockStore({});

  store.dispatch(fetchPoemSuccess(poem, poemId));
  const [ poemSuccess ] = store.getActions();

  expect(poemSuccess.type).toEqual(actionTypes.FETCH_POEM_SUCCESS);
  expect(poemSuccess.payload.poemId).toEqual(poemId);
  expect(poemSuccess.payload.poem).toEqual(poem);
});
