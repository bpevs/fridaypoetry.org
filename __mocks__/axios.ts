const get = jest.fn((url: string) => {
  return Promise.resolve({ data: {
    poem1: "poem1",
    poem2: "poem2",
    poem3: "poem3",
  }});
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
