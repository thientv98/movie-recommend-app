// "use client"
import MainHomeFilms from '@/components/home/MainHomeFilms';
import { USER_LOGIN } from '@/grapql/user.query';

// import { getClient } from "@/lib/client";

import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

// const query = gql`query Query {
//   getMovies {
//     _id
//     title
//     thumbnail
//     vote_average
//   }
// }`;

export default async function Home() {
  // const { data } = await getClient().query({ query });
  // const { data } = useSuspenseQuery(query);
  // console.log(data);

  return (
    <>
      <MainHomeFilms />
    </>
  )
}
