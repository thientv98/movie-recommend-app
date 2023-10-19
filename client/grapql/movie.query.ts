import { gql } from "@apollo/client";

export const LIST_MOVIES = gql`query Query {
    getMovies {
      _id
      title
      thumbnail
      vote_average
    }
  }`;