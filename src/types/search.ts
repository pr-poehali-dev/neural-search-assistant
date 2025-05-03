
export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface SearchResults {
  answer: string;
  sources: Source[];
}
