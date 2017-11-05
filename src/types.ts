export interface Poem {
  author?: string;
  created?: number;
  text: string;
  title?: string;
}

export interface State {
  error?: string;
  poems: Poem[];
}
