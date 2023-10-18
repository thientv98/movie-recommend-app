import Link from "next/link";
import { FunctionComponent } from "react";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FilmItemProps {
}

const FilmItem: FunctionComponent<FilmItemProps> = () => {
    return (
        <Link
            href='/'
        >
            <div className="shadow-sm bg-dark-darken pb-2 rounded-md overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 relative group">
                <LazyLoadImage
                    alt="Poster film"
                    src="https://image.tmdb.org/t/p/w342/fcXdJlbSdUEeMSJFsXKsznGwwok.jpg"
                    className="object-cover"
                    effect="blur"
                />
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 mt-1 text-center px-2 group-hover:text-white transition duration-300">
                    title
                </p>
                <div className="bg-primary px-2 py-1 rounded-full absolute top-[5%] left-[8%] z-20 flex items-center gap-1 text-white text-xs">
                    8.7
                    <AiFillStar size={15} />
                </div>
            </div>
        </Link>
    );
};

export default FilmItem;
