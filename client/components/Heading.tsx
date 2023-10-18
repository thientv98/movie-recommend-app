import Link from 'next/link'

export default function Heading({

}) {
    return (
        <div className='mb-4 flex items-end justify-between sm:mb-6'>
            <div className='flex items-end'>
                <h2 className='section-title py-px sm:py-0'>abc</h2>
                <p
                    className="ml-2 rounded-md border-2 py-px px-2 text-[8px] font-medium uppercase tracking-wider text-app-pure-white sm:ml-4 sm:text-[10px]">
                    1234
                </p>
            </div>
            <Link href="/" >
                See more
            </Link>
        </div>
    )
}
