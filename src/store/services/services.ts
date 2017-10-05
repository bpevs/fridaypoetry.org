const poems = require("./__mocks__/fixtures/poems.json");
const baseUrl = "https://friday-poetry.firebaseio.com/";

export function createPoem(poem: any) {
  return Promise.resolve();
}

export function fetchPoem(poemId: number) {
  return fetch(`${baseUrl}/poems/${poemId}.json`);
}

export function fetchPoems(startId?: number) {
  const url = startId == null
    ? `${baseUrl}/poems.json?orderBy="id"`
    : `${baseUrl}/poems.json?orderBy="id"&startAt=${startId - 5}&endAt=${startId + 5}`;

  return fetch(url)
    .then(response => response.json() )
    .then(poems => ({ poems }));
}
