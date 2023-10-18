import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useCurrentViewportView } from "../../hooks/useCurrentViewportView";
import { useState } from 'react';
import Skeleton from "@/components/common/Skeleton";
import Link from "next/link";
import { Autoplay, Navigation } from 'swiper/modules';

interface BannerSliderProps {
}

const BannerSlider: FC<BannerSliderProps> = () => {
  const { isMobile } = useCurrentViewportView();
  const [isLoadingBanner, setIsLoadingBanner] = useState(false)

  return (
    <div className="mt-6 relative h-0 md:pb-[45%] pb-[55%] tw-banner-slider">
      {isLoadingBanner ? (
        <Skeleton className="absolute top-0 left-0 w-full h-full !rounded-lg" />
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView={1}
          className="!absolute !top-0 !left-0 !w-full !h-full  !rounded-lg"
        >
          {Array.from({ length: 5 }, () => 0).map((film, index) => (
            <SwiperSlide key={index}>
              <Link
                href="/"
                className="group"
              >
                <LazyLoadImage
                  src="https://image.tmdb.org/t/p/w1280/4qDlkEAKFb4pgIUbeJMLyHX2Xym.jpg"
                  alt="Backdrop image"
                  effect="blur"
                />

                <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-700"></div>

                <div className="hidden md:flex absolute top-[5%] right-[3%] bg-primary px-3 py-1 rounded-full text-white  items-center gap-1">
                  <span>9.2</span>
                  <AiFillStar size={15} />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#c353b4] tw-flex-center z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-700">
                  <BsFillPlayFill size={35} className="text-white" />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-[5%] md:max-w-md max-w-[200px]">
                  <h2 className="md:text-5xl text-xl  text-primary font-black tracking-wide md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
                    Title film
                  </h2>

                  <div>
                    <p className="text-white font-semibold md:text-2xl text-base mt-6">
                      Trans
                    </p>
                    <p className="mt-1">
                      Release date: 2020-01-01
                    </p>
                    {!isMobile && (
                      <>
                        <div className="flex gap-2 flex-wrap mt-5">
                          <div
                            className="px-3 py-1 border rounded-full "
                          >
                            Action
                          </div>
                          <div
                            className="px-3 py-1 border rounded-full "
                          >
                            Drama
                          </div>
                        </div>
                        <p className=" mt-3 text-base tw-multiline-ellipsis-3">
                          Ruthless siblings Roderick and Madeline Usher have built Fortunato Pharmaceuticals into an empire of wealth, privilege and power. But past secrets come to light when the heirs to the Usher dynasty start dying at the hands of a mysterious woman from their youth.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <div className="absolute top-0 left-0 w-[8%] h-[11%] z-10"></div>
        </Swiper>
      )}
    </div>
  );
};

export default BannerSlider;
