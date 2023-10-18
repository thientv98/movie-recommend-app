import FilmItem from "@/components/common/FilmItem";
import Skeleton from "@/components/common/Skeleton";
import BannerSlider from "@/components/slider/BannerSlider";
import { FC, useState } from "react";

interface MainHomeFilmsProps {

}

const MainHomeFilms: FC<MainHomeFilmsProps> = () => {
    const [isLoadingSection, setIsLoadingSection] = useState(false);
    return (
        <>
            <BannerSlider />

            <h2 className="text-xl text-white font-medium tracking-wider mb-3 mt-12">
                Popular
            </h2>
            <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2">
                {isLoadingSection ? (
                    <>
                        {new Array(1).fill("").map((_, index) => (
                            <li key={index}>
                                <Skeleton className="h-0 pb-[160%]" />
                            </li>
                        ))}
                    </>
                ) : (
                    Array.from({ length: 20 }, () => 0).map((section, index) => (
                        <li key={index}>
                            <FilmItem />
                        </li>
                    ))
                )}
            </ul>
        </>
    );
};

export default MainHomeFilms;
