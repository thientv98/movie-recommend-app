export default function CardInfo() {
    return (
        <div
            className='absolute left-4 bottom-4 z-40 h-fit w-fit truncate text-ellipsis'
        >
            <div
                className='mt-2 mb-1 flex text-[11px] font-light text-app-pure-white md:text-[15px]'
            >
                <p>2000</p>
                <div
                    className='flex items-center px-[8px] before:content-["•"]'
                >
                    categhory
                    <p className='pl-[6px] pr-[6px]'>
                        ca
                    </p>
                </div>
            </div>
            <h2
                className='md:heading-sm text-ellips w-[200px] truncate text-sm font-bold capitalize text-app-pure-white sm:w-[420px] md:h-6'
            >
                title
            </h2>
        </div>
    )
}
