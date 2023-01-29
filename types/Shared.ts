export interface MovieResult {
  id: string;
  resultType: string;
  image: string;
  title: string;
  description: string;
}

export interface MovieShort {
  id: string;
  title: string;
  image: string;
  imDbRating: string;
}

export interface SearchResult {
  searchType: string;
  expression: string;
  results: MovieResult[];
  errorMessage: string;
}

export interface Actor {
  id: string;
  image: string;
  name: string;
  asCharacter: string;
}

export interface MovieDetails {
  id: string;
  title: string;
  type: string;
  year: string;
  image: string;
  releaseDate: string;
  plot: string;
  awards: string;
  directors: string;
  writers: string;
  stars: string;
  actorList: Actor[];
  genres: string;
  companies: string;
  countries: string;
  imDbRating: string;
  similars: MovieShort[];
  tvSeriesInfo: {
    yearEnd: string;
    creators: string;
    creatorList: {
      id: string;
      name: string;
    }[];
    seasons: string[];
  };
  errorMessage: string;
}
