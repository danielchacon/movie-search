export interface Image {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface MovieResult {
  id: string;
  titleType: string;
  image: Image;
  title: string;
  year: number;
}

export interface SearchResult {
  types: string[];
  query: string;
  results: MovieResult[];
}

export interface Person {
  id: string;
  image: Image;
  legacyNameText: string;
  name: string;
  category: string;
  endYear: 2015;
  episodeCount?: 39;
  startYear: 2013;
}

export interface Character {
  character: string;
  characterId: string;
}

export interface Actor extends Person {
  characters: string[];
  roles: Character[];
}

export interface CrewMember extends Person {
  disambiguation?: string;
  job?: string;
}

export interface MovieBase {
  id: string;
  image: Image;
  runningTimeInMinutes: number;
  title: string;
  titleType: string;
  year: number;
  seriesEndYear?: number;
  seriesStartYear?: number;
  numberOfEpisodes?: number;
}

export interface OverviewDetails {
  id: string;
  title: MovieBase;
  ratings: {
    canRate: boolean;
    rating: number;
  };
  genres: string[];
  releaseDate: string;
  plotOutline: {
    id: string;
    text: string;
  };
}

export interface FullCredits {
  id: string;
  base: MovieBase;
  cast: Actor[];
  crew: {
    [key: string]: CrewMember[];
  };
}

export type MoreLikeThis = string[];

// ---------------------

export type Schedule = {
  time: string;
  days: string[];
};

export type Rating = {
  average: number;
};

export type Country = {
  name: string;
  code: string;
  timezone: string;
};

export type Network = {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
};

export type Externals = {
  tvrage: number;
  thetvdb: number;
  imdb: string;
};

export type Image2 = {
  medium: string;
  original: string;
};

export type SelfLink = {
  href: string;
};

export type PrevEpisodeLink = {
  href: string;
  name: string;
};

export type Links = {
  self: SelfLink;
  previousepisode?: PrevEpisodeLink;
};

export type Show = {
  id: number;
  url: string;
  name: string;
  type?: string | null;
  language?: string | null;
  genres?: string[];
  status?: string | null;
  runtime?: number | null;
  averageRuntime?: number | null;
  premiered?: string | null;
  ended?: string | null;
  officialSite?: string | null;
  schedule?: Schedule | null;
  rating?: Rating | null;
  weight?: number | null;
  network?: Network | null;
  webChannel?: string | null;
  dvdCountry?: string | null;
  externals?: Externals | null;
  image?: Image2 | null;
  summary?: string | null;
  updated?: number | null;
  _links?: Links | null;
};

export type ShowSearchResult = {
  score: number;
  show: Show;
};

export type Person2 = {
  id: number;
  url: string;
  name: string;
  country?: Country | null;
  birthday?: string | null;
  deathday?: string | null;
  gender?: string | null;
  image?: Image2 | null;
  updated?: number | null;
  _links?: Links | null;
};

export type Character2 = {
  id: number;
  url: string;
  name: string;
  image?: Image | null;
  _links?: Links | null;
};

export type CastItem = {
  person?: Person2 | null;
  character?: Character2 | null;
  self?: boolean | null;
  voice?: boolean | null;
};

export type Info = Array<{ [key: string]: string | number | null | undefined }>;
