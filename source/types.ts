export interface Poem {
  id: string | null;
  content: string;
  published: number;
  author?: string;
  title?: string;

  // Surrouinding IDs
  next?: string;
  prev?: string;
}
