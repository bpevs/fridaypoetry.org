import * as types from "../actions/actionTypes";
import { assign, map, merge, union } from "lodash";
import { combineReducers } from "redux";


const poemReducer = combineReducers({
  allIds: allPoemIds, byId: poemsById
});

export default combineReducers({
  poems: poemReducer,
  currentPage: pageReducer
});


// Reducers
//––––––––––
function pageReducer(state = 0, action) {
  if (action.type == "TURN_PAGE") {
    return Math.max(0, state + action.direction);
  }
  return state;
}


function allPoemIds(state = [], action) {
  switch (action.type) {
    case types.FETCH_POEMS_SUCCESS:
      return updateAllIds(state, action);

    case types.FETCH_POEM_SUCCESS:
      return updateId(state, action);

    default:
      return state;
  }
}

function poemsById(state = {}, action) {
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
function updateAllEntries(state, action) {
  const { poems } = action.payload;
  return merge({}, state, poems);
}

function updateEntry(state, action) {
  const { poemId, poem } = action.payload;
  return assign({}, state, {
    [poemId]: merge({}, state[poemId], poem)
  });
}

function updateAllIds(state, action) {
  const poemIds = map(action.payload.poems, (poem: any) => poem.id);
  return union(state, poemIds).sort();
}

function updateId(state, action) {
  return union(state, [ action.payload.poemId ]);
}
