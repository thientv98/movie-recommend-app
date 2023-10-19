import Skeleton from "@/components/common/Skeleton";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FilmItemProps {
  movie: any
}

const FilmItem: FunctionComponent<FilmItemProps> = ({ movie }) => {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const onLoadedImage = () => {
    console.log(123);

    setShowSkeleton(false)
  }
  return (
    <>
      <Link
        href={`/movie/${movie._id}`}
      >
        <div className={`shadow-sm  pb-2 rounded-md overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 relative group ${!showSkeleton ? 'bg-dark-darken' : ''}`}>
          <LazyLoadImage
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w342${movie.thumbnail}`}
            className="object-cover"
            effect="blur"
            onLoad={onLoadedImage}
          />
          {showSkeleton ?
            <Skeleton className="h-0 pb-[160%]" /> :
            <>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 mt-1 text-center px-2 group-hover:text-white transition duration-300">
                {movie.title}
              </p>
              <div className="bg-primary px-2 py-1 rounded-full absolute top-[5%] left-[8%] z-20 flex items-center gap-1 text-white text-xs">
                {movie.vote_average / 10}
                <AiFillStar size={15} />
              </div>
            </>
          }

        </div>
      </Link>
    </>
  );
};

export default FilmItem;
