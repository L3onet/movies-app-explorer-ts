import { Movie } from '../types/movie';

export type RootStackParamList = {
  MoviesList: undefined;
  MovieDetail: { movie: Movie };
};
