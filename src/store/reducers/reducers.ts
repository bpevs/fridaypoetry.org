import { assign, map, merge, union } from "lodash";
import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";


interface Action {
  type?: string;
  types?: string[];
  [ key: string ]: any;
}

interface ByIdState {
  [ key: string ]: any;
}

const poemReducer = combineReducers({
  allIds: allPoemIds, byId: poemsById
});

export default combineReducers({
  poems: poemReducer
});


// Reducers
// ––––––––––
function allPoemIds(state: string[] = [], action: Action) {
  switch (action.type) {
    case types.FETCH_POEMS_SUCCESS:
      return updateAllIds(state, action);

    case types.FETCH_POEM_SUCCESS:
      return updateId(state, action);

    default:
      return state;
  }
}

function poemsById(state: ByIdState = {}, action: Action) {
  switch (action.type) {
    case types.FETCH_POEMS_SUCCESS:
      return updateAllEntries(state, action);

    case types.FETCH_POEM_SUCCESS:
      return updateEntry(state, action);

    default:
      return state;
  }
}


// Updaters
// –––––––––––––––––––––––––––––––––––––––––
function updateAllEntries(state: ByIdState, action: Action) {
  const { poems } = action.payload;
  return merge({}, state, poems);
}

function updateEntry(state: ByIdState, action: Action) {
  const { poemId, poem } = action.payload;
  return assign({}, state, {
    [poemId]: merge({}, state[poemId], poem)
  });
}

function updateAllIds(state: string[], action: Action) {
  const poemIds = map(action.payload.poems, (poem: any) => poem.id);
  return union(state, poemIds).sort();
}

function updateId(state: string[], action: Action) {
  return union(state, [ action.payload.poemId ]);
}
