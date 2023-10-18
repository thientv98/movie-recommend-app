import ReadMore from "@/components/common/ReadMore";
import Skeleton from "@/components/common/Skeleton";
import { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FilmTabInfoProps {

}

const FilmTabInfo: FC<FilmTabInfoProps> = () => {
  const [currentTab, setCurrentTab] = useState("overall");

  const tabButtons = ["overall", "cast"];

  return (
    <>
      <ul className="flex gap-10 text-gray-400 text-lg justify-center">
        {tabButtons.map((btnName: string, index: number) => (
          <li
            key={index}
          >
            <button
              onClick={() => setCurrentTab(btnName)}
              className={`hover:text-white transition duration-300 pb-1 ${currentTab === btnName &&
                "font-medium -translate-y-2 border-b-2 border-primary text-white"
                }`}
            >
              {btnName[0].toUpperCase() + btnName.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-lg">
        {currentTab === "overall" && (
          <>
            {true && (
              <p className="text-xl italic mb-8 text-white text-center">
                Justice knows no borders.
              </p>
            )}
            {!true && <Skeleton className="h-6 w-[350px] mx-auto mb-8" />}
            <p className="text-white font-medium  mb-3">STORY</p>
            {true && (
              <ReadMore limitTextLength={250}>Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.</ReadMore>
            )}
            {!true && (
              <>
                <Skeleton className="h-20" />
              </>
            )}
            <p className="text-white font-medium mt-8 mb-3">DETAILS</p>
            {!true && (
              <>
                <Skeleton className="h-16 w-[40%]" />
              </>
            )}
            {true && (
              <>
                <p>Status: Released</p>
                <p>Release date: 2023-08-30</p>
                <p>
                  Spoken language: English, Italian
                </p>
              </>
            )}
          </>
        )}
        {currentTab === "cast" && (
          <ul className="grid grid-cols-2 gap-x-20 gap-y-8">
            <li className="flex gap-3 items-center">
              <div className="shrink-0 max-w-[65px] w-full h-[65px]">
                <LazyLoadImage
                  src="https://image.tmdb.org/t/p/w185/jj2Gcobpopokal0YstuCQW0ldJ4.jpg"
                  alt=""
                  effect="opacity"
                  className="object-cover rounded-full h-[65px] w-[65px]"
                />
              </div>
              <div className="flex-grow">
                <p className="text-primary text-lg font-medium">
                  Denzel Washington
                </p>
                <p className="text-white text-base">
                  <span className="italic">as</span> Robert McCall
                </p>
              </div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
export default FilmTabInfo;
