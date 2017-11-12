import { clone } from "lodash";
import reducer from "./reducers";


const defaultState = {
  poems: {
    allIds: undefined,
    byId: undefined
  }
};

test("Should have default state", () => {
  expect(reducer(undefined, { type: undefined })).toMatchSnapshot();
});

describe("FETCH_IDS_SUCCESS", function() {
  beforeEach(() => {
    this.prevState = clone(defaultState);
    this.action = { type: "FETCH_IDS_SUCCESS" };
  });

  test("Should update initial ids", () => {
    this.action.payload = {
      ids: [ "1-id", "2-id", "3-id" ]
    };

    expect(reducer(this.prevState, this.action)).toMatchSnapshot();
  });

  test("Should update subsequent ids", () => {
    this.prevState.poems.allIds = [ "1-id", "3-id", "4-id" ];
    this.action.payload = {
      ids: [ "2-id", "3-id", "5-id" ]
    };

    expect(reducer(this.prevState, this.action)).toMatchSnapshot();
  });
});

describe("FETCH_POEM_SUCCESS", function() {
  beforeEach(() => {
    this.prevState = clone(defaultState);
    this.action = { type: "FETCH_POEM_SUCCESS" };
  });

  test("FETCH_POEM_SUCCESS should update initial poem", () => {
    this.action.payload = {
      poem: {
        author: "poem-6-author",
        text: "poem-6-text",
        title: "poem-6-title"
      },
      poemId: "6-id"
    };

    expect(reducer(this.prevState, this.action)).toMatchSnapshot();
  });

  test("FETCH_POEM_SUCCESS should update subsequent poem", () => {
    this.prevState.poems.allIds = [ "1-id", "3-id", "4-id" ];
    this.prevState.poems.byId = {
      "3-id": {
        author: "poem-3-author",
        text: "poem-3-text",
        title: "poem-3-title"
      }
    };
    this.action.payload = {
      poem: {
        author: "poem-author",
        text: "poem-text",
        title: "poem-title"
      },
      poemId: "2-id"
    };

    expect(reducer(this.prevState, this.action)).toMatchSnapshot();
  });
});
