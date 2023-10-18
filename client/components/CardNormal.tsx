import { useRouter } from 'next/router'
import CardImage from '@/components/CardImage'
import CardInfo from '@/components/CardInfo'

export default function CardNormal() {

  return (
    <div
      className='card-hover-animation mb-4 grow basis-1/5 2xs:w-[130px] xs:w-full cursor-pointer'>
      <CardImage />
      <CardInfo />
    </div>
  )
}
