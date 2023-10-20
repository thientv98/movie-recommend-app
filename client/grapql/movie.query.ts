import { gql } from "@apollo/client";

export const LIST_MOVIES = gql`query Query {
    getMovies {
      _id
      title
      thumbnail
      vote_average
    }
  }`;

export const MOVIE_DETAIL = gql`query Query($id: String!) {
  getMovie(id: $id) {
    _id
    actors {
      _id
      avatar
      name
    }
    backdrop
    genres {
      _id
      name
    }
    overview
    popularity
    release_date
    thumbnail
    time
    title
    vote_average
    vote_count
  }
}`