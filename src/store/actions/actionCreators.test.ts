jest.mock("axios");

import { callApiMiddleware } from "@zuck/core";
import configureStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { createPoem, fetchPoem, fetchPoemIds, fetchPoemSuccess } from "./actionCreators";
import * as actionTypes from "./actionTypes";

const middlewares = [ callApiMiddleware, thunkMiddleware ];
const mockStore = configureStore(middlewares);


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
