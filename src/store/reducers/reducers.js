import { assign, merge, union } from "lodash";
import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";


const poemReducer = combineReducers({
  allIds: allPoemIds, byId: poemsById
});

export default combineReducers({
  poems: poemReducer
});


// Reducers
// ––––––––––
function allPoemIds(state = [], action) {
  switch (action.type) {
    case types.FETCH_IDS_SUCCESS:
      return updateAllIds(state, action);

    case types.FETCH_POEM_SUCCESS:
      return updateId(state, action);

    default:
      return state;
  }
}

function poemsById(state = {}, action) {
  switch (action.type) {
    case types.FETCH_POEM_SUCCESS:
      return updateEntry(state, action);

    default:
      return state;
  }
}


// Updaters
// –––––––––
function updateEntry(state, action) {
  const { poemId, poem } = action.payload;
  return assign({}, state, {
    [poemId]: merge({}, state[poemId], poem)
  });
}

function updateAllIds(state, action) {
  const { ids } = action.payload;
  return union(state, ids).sort().reverse();
}

function updateId(state, action) {
  return union(state, [ action.payload.poemId ]).sort().reverse();
}
