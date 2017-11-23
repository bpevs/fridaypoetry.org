jest.mock("axios");

import axios from "axios";
import { BASE_URL } from "../../config";
import { createPoem, fetchPoem, fetchPoemIds } from "./services";


afterEach(() => {
  jest.clearAllMocks();
});

describe("createPoem", function() {
  beforeEach(() => {
    Date.prototype.getDay = () => 5;

    this.poem = {
      author: "author",
      text: "text",
      title: "title"
    };
  });

  test("Should create a poem if it's friday", () => {
    return createPoem(this.poem)
      .then(({ poemId }) => {
        expect(typeof poemId).toEqual("string");
        expect(axios.post.mock.calls.length).toEqual(1);
        const [ url, poemData ] = axios.post.mock.calls[0];
        expect(url).toEqual(`${BASE_URL}.json`);
        expect(poemData).toMatchSnapshot();
      });
  });

  test("Should create a poem without an author or title if it's friday", () => {
    this.poem.author = undefined;
    this.poem.title = undefined;

    return createPoem(this.poem)
      .then(({ poemId }) => {
        expect(typeof poemId).toEqual("string");
        expect(axios.post.mock.calls.length).toEqual(1);
        const [ url, poemData ] = axios.post.mock.calls[0];
        expect(url).toEqual(`${BASE_URL}.json`);
        expect(poemData).toMatchSnapshot();
      });
  });

  test("Should fail on friday if no text", () => {
    this.poem.text = undefined;

    return createPoem(this.poem)
      .catch(error => {
        expect(error).toEqual("No Poem text!");
        expect(axios.post.mock.calls.length).toEqual(0);
      });
  });

  test("Should fail if it's not friday", () => {
    Date.prototype.getDay = () => 4;

    return createPoem(this.poem)
      .catch(error => {
        expect(error).toEqual("It's not Friday!");
        expect(axios.post.mock.calls.length).toEqual(0);
      });
  });
});

describe("fetchPoemIds", () => {
  test("Should fetch poem ids", () => {
    return fetchPoemIds()
      .then(({ ids }) => {
        expect(axios.get.mock.calls.length).toEqual(1);
        const [ url ] = axios.get.mock.calls[0];
        expect(url).toEqual(`${BASE_URL}.json?shallow=true`);
        expect(Array.isArray(ids)).toEqual(true);
      });
  });
});

describe("fetchPoem", () => {
  test("Should fetch poem", () => {
    const poemId = "success-poem";
    return fetchPoem(poemId)
      .then(poem => {
        expect(axios.get.mock.calls.length).toEqual(1);
        const [ url ] = axios.get.mock.calls[0];
        expect(url).toEqual(`${BASE_URL}/${poemId}.json`);
      });
  });
});
