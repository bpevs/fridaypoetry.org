export interface Poem {
  id: string;
  text: string;
  published: date;
  author?: string;
  title?: string;

  // IDs
  next?: string;
  prev?: string;
}

export type DbResponse = any;
