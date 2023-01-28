export interface Movie {
  id: string;
  image: string;
  title: string;
  description: string;
  runtimeStr: string | null;
  genres: string;
  genreList: { key: string; value: string }[];
  contentRating: string | null;
  imDbRating: string | number | null;
  imDbRatingVotes: string | number | null;
  metacriticRating: string | number | null;
  plot: string | null;
  stars: string | null;
  starList: { id: string; name: string }[] | null;
}
