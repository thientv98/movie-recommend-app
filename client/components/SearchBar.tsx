"use client"
import { useState } from 'react'

export default function SearchBar({
  placeholder = 'Search for movies or TV series',
}) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
  }

  return (
    <form onSubmit={handleSearch} className='flex grow pb-6 md:pb-10 lg:mt-9'>
      <svg
        className="h-6 w-6 md:h-8 md:w-8"
        fill='currentColor'
        width='1em'
        height='1em'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z' />
      </svg>
      <input
        className='md:heading-md md:placeholder:heading-md mx-4 w-full rounded-none border-b border-app-dark-blue bg-app-dark-blue pb-[8px] text-base font-light caret-app-red placeholder:text-base placeholder:text-app-placeholder focus:border-b focus:border-app-greyish-blue focus:outline-none'
        type='text'
        placeholder={placeholder}
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <button
        type='submit'
        className='text-capitalize flex items-center justify-center rounded-md bg-app-greyish-blue py-2 px-3 text-xs text-app-pure-white hover:bg-app-pure-white hover:text-app-dark-blue'>
        Search
      </button>
    </form>
  )
}
