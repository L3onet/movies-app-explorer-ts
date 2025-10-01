export const screens = {
    movies: {
      moviesList: "MoviesList" as const,
      movieDetail: "MovieDetail" as const,
    },
  } as const;
  
  export type ScreenNames = typeof screens.movies[keyof typeof screens.movies];