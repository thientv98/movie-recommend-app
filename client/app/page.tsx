import Collection from '@/components/Collections'
import SearchBar from '@/components/SearchBar'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Watcho</title>
      </Head>
      <SearchBar />

      <Collection />
    </>
  )
}
