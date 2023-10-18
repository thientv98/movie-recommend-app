// "use client"
import MainHomeFilms from '@/components/home/MainHomeFilms';

import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`query Query {
  getMovies {
    _id
    title
    genres {
      _id
      name
    }
    actors {
      _id
      name
    }
  }
}`;

export default async function Home() {
  const { data } = await getClient().query({ query });
  // const { data } = useSuspenseQuery(query);
  console.log(data);


  return (
    <>
      <MainHomeFilms />
    </>
  )
}
