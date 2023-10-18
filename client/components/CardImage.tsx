import Image from 'next/image'

export default function CardImage() {
  return (
    <div className='relative w-full rounded-lg'>
      <div
        className='relative h-[140px] w-[240px] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-app-dark-blue after:opacity-50 after:content-[""] sm:h-[230px] sm:w-[470px]'>
        <Image
          className='rounded-lg'
          src="https://image.tmdb.org/t/p/original//628Dep6AxEtDxjZoGP78TsOxYbK.jpg"
          alt="abc"
          layout='fill'
          objectFit='cover'
          unoptimized
        />
      </div>
    </div >
  )
}
