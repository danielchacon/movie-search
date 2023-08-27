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