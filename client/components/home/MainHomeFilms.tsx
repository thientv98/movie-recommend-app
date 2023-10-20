"use client"
import FilmItem from "@/components/common/FilmItem";
import Skeleton from "@/components/common/Skeleton";
import BannerSlider from "@/components/slider/BannerSlider";
import { LIST_MOVIES } from "@/grapql/movie.query";
import { useSuspenseQuery } from "@apollo/client";
import { FC, useState } from "react";

interface MainHomeFilmsProps {
}

const MainHomeFilms: FC<MainHomeFilmsProps> = () => {
  const { data }: any = useSuspenseQuery(LIST_MOVIES);

  return (
    <>
      <BannerSlider />

      <h2 className="text-xl text-white font-medium tracking-wider mb-3 mt-12">
        Popular
      </h2>
      <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2 px-2">
        {data?.getMovies.map((movie: any) => (
          <li key={movie._id}>
            <FilmItem movie={movie} />
          </li>
        ))
        }
      </ul>
    </>
  );
};

export default MainHomeFilms;
