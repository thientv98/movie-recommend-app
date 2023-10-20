"use client"

import Skeleton from "@/components/common/Skeleton";
import FilmTabInfo from "@/components/film/FilmTabInfo";
import { MOVIE_DETAIL } from "@/grapql/movie.query";
import { useCurrentViewportView } from "@/hooks/useCurrentViewportView";
import { useSuspenseQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiFillHeart, AiFillPlayCircle, AiOutlineDotChart, AiOutlineShareAlt } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { isMobile } = useCurrentViewportView();
  const [isBookmarked, setIsBookmarked] = useState(false)

  const { data }: any = useSuspenseQuery(MOVIE_DETAIL, {
    variables: { id: params.id },
  });

  const movie = data.getMovie

  console.log(movie);


  return (
    <>
      <div className="flex-grow min-h-screen mt-5">
        {/* BACKDROP AND GENERAL INFORMATION */}
        <div
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop}")`,
          }}
          className="bg-cover bg-center bg-no-repeat md:h-[400px] h-[300px] rounded-bl-2xl relative"
        >
          <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-bl-2xl">
            <div className="flex flex-col md:flex-row bottom-[-85%] md:bottom-[-20%]  items-start tw-absolute-center-horizontal w-full max-w-[1000px]">
              {/* POSTER */}
              <div className="flex gap-5 items-center">
                <div className="shrink-0 w-[185px] ml-3 md:ml-0">
                  <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/w185${movie.thumbnail}`}
                    effect="opacity"
                    className="w-full h-full object-cover rounded-md"
                    alt="Poster"
                  />
                </div>
                {isMobile && (
                  <Link
                    href="/"
                    className="flex gap-6 items-center pl-6 pr-12 py-3 rounded-full bg-primary text-white hover:bg-blue-600 transition duration-300 mt-24 "
                  >
                    <AiFillPlayCircle size={25} />
                    <span className="text-lg font-medium">WATCH</span>
                  </Link>
                )}
              </div>

              {/* FILM TITLE */}
              <div className="flex-grow md:ml-14 ml-6 mt-6 md:mt-0">
                <div className="md:h-28 flex items-end">
                  <h1 className=" text-white text-[45px] font-bold leading-tight">
                    {movie?.title}
                  </h1>
                </div>
                <ul className="flex gap-3 flex-wrap md:mt-7 mt-3">
                  {movie?.genres && movie.genres.map((item: any) => (
                    <li className="mb-3" key={item._id}>
                      <Link
                        href='/'
                        className="md:px-5 px-3 md:py-2 py-1 rounded-full uppercase font-medium border border-gray-300 md:text-white hover:brightness-75 transition duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>

              {/* WATCH NOW */}
              {!isMobile && (
                <Link
                  href="watch"
                  className="flex gap-6 items-center pl-6 pr-12 py-3 rounded-full bg-primary text-white hover:bg-blue-600 transition duration-300 mt-24 "
                >
                  <AiFillPlayCircle size={25} />
                  <span className="text-lg font-medium">WATCH</span>
                </Link>
              )}
            </div>

            {/* BOOKMARK BUTTONS */}
            <div className="flex gap-3 absolute top-[5%] right-[3%]">
              <button
                className={`tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group ${isBookmarked && "!border-primary"
                  }`}
              >
                <AiFillHeart
                  size={20}
                  className={`text-white group-hover:text-primary transition duration-300 ${isBookmarked && "!text-primary"
                    }`}
                />
              </button>
              {!isMobile && (
                <>
                  <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
                    <AiOutlineShareAlt
                      size={20}
                      className="text-white group-hover:text-primary transition duration-300"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DETAIL INFORMATION */}
        <div className="flex z-20 relative flex-col md:flex-row mt-32 md:mt-0">
          {!isMobile && (
            <div className="shrink-0 md:max-w-[150px] w-full flex items-center md:flex-col justify-center flex-row gap-20 mt-20 md:border-r border-dark-lighten pt-16">
              <div className="flex flex-col gap-6 items-center">
                <p className="text-white font-medium text-lg">RATING</p>
                {!isMobile && (
                  <div className="w-16">
                    <CircularProgressbar
                      value={movie?.vote_average ?? 0}
                      maxValue={10}
                      text={movie?.vote_average ?? 0}
                      styles={buildStyles({
                        textSize: "25px",
                        pathColor: `rgba(81, 121, 255, 87)`,
                        textColor: "#fff",
                        trailColor: "transparent",
                        backgroundColor: "#5179ff",
                      })}
                    />
                  </div>
                )}
                {isMobile && (
                  <p className="text-2xl -mt-3">
                    {movie?.vote_average ?? 0}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 items-center">
                {true && (
                  <>
                    <p className="text-white font-medium text-lg">
                      RUNTIME
                    </p>
                    <div className="flex gap-2 items-center">
                      <p className="text-2xl">
                        {movie?.time ?? 0}
                      </p>
                      <span>min</span>
                    </div>
                  </>
                )}
                {!true && (
                  <>
                    <p className="text-white font-medium text-lg">RUNTIME</p>
                    <Skeleton className="w-14 h-6" />
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex-grow min-h-[500px] md:border-r border-dark-lighten md:px-16 px-5 md:py-7 pt-40">
            <FilmTabInfo movie={movie} />
          </div>
        </div>
      </div>
    </>
  )
}