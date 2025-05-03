
export interface SearchSource {
  title: string;
  url: string;
  snippet: string;
}

export interface SearchResults {
  answer: string;
  sources: SearchSource[];
}
