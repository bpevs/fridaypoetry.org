const poems = require("./__mocks__/fixtures/poems.json");

export function createPoem(poem: any) {
  return Promise.resolve();
}

export function fetchPoem(poemId: string) {
  return Promise.resolve();
}

export function fetchPoems() {
  return Promise.resolve(poems);
}
