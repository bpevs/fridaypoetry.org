import { BASE_URL } from "../src/constants";

const mockResponses = {
  default: null,
  successIds: {
    poem1: "poem1",
    poem2: "poem2",
    poem3: "poem3"
  },
  successPoem: {
    author: "success-poem",
    text: "success-text",
    title: "success-title"
  }
};


const get = jest.fn((url: string) => {
  switch (url) {
    case `${BASE_URL}.json?shallow=true`:
      return Promise.resolve({ data: mockResponses.successIds });
    case `${BASE_URL}/success-poem.json`:
      return Promise.resolve({ data: mockResponses.successPoem });
    default:
      return Promise.reject("errored!");
  }
});


const post = jest.fn((url: string, poemData: any) => {
  if (!poemData) {
    return Promise.reject("No poem Data");
  }
  const { author, text, title } = poemData;

  if (typeof text !== "string") {
    return Promise.reject("no poem text");
  }

  return Promise.resolve({data: { name: "poem-id" }});
});

export default { get, post };
