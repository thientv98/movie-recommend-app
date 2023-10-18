import Heading from '@/components/Heading'
import CardNormal from './CardNormal'

export default function Collection() {

  return (
    <>
      <section
        className="'mb-6 h-full w-full overflow-hidden md:mb-10 lg:overflow-visible'">
        <Heading />
        <section
          className="'h-scroll relative flex gap-x-4 overflow-x-scroll sm:gap-x-10 2xs:mt-2'">
          <CardNormal />
        </section>
      </section>
    </>
  )
}
