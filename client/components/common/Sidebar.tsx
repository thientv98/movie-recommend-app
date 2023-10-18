"use client"
import { useCurrentViewportView } from "@/hooks/useCurrentViewportView";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface SidebarProps {
  isSidebarActive: boolean;
  onCloseSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarActive, onCloseSidebar }) => {
  const { isMobile } = useCurrentViewportView();
  const pathname = usePathname()

  return (
    <>
      <div
        className={`shrink-0 md:max-w-[260px] w-[70vw] pl-8 top-0 pt-10  
        md:sticky md:translate-x-0 md:bg-transparent md:shadow-none
    
      -translate-x-full fixed h-screen shadow-md transition duration-300 bg-dark-lighten z-50 ${isSidebarActive && "translate-x-0"
          }`}
      >
        {!isMobile && (
          <Link href="/" className="flex items-center gap-3">
            <LazyLoadImage
              alt="Logo"
              src="/images/logo.png"
              effect="opacity"
              className="w-10 h-10"
            />
            <h1 className="text-xl text-white tracking-widest font-semibold uppercase">
              <span>Moon</span>
              <span className="text-primary">light</span>
            </h1>
          </Link>
        )}

        <div
          className={`text-white text-lg font-medium ${isSidebarActive ? "-mt-6" : "mt-12"
            }`}
        >
          MENU
        </div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            href="/"
            className={`flex gap-6 items-center  ${pathname === "/" &&
              "!text-primary border-r-4 border-primary font-medium"
              } hover:text-white transition duration-300`}
          >
            <AiOutlineHome size={25} />
            <p>Home</p>
          </Link>

          <Link
            href="/search"
            className={`flex gap-6 items-center  ${pathname === "/search" &&
              "!text-primary border-r-4 border-primary font-medium"
              } hover:text-white transition duration-300`}
          >
            <AiOutlineSearch size={25} />
            <p>Search</p>
          </Link>

        </div>

        <div className="text-white text-lg font-medium mt-12">GENERAL</div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            href="/profile"
            className={`flex gap-6 items-center  ${pathname === "/profile" &&
              "!text-primary border-r-4 border-primary font-medium"
              } hover:text-white transition duration-300`}
          >
            <AiOutlineUser size={25} />
            <p>Profile</p>
          </Link>

          <Link
            href="/"
            className="flex gap-5 items-center"
          >
            <AiOutlineLogin size={30} />
            <p>Login</p>
          </Link>

          <button
            className="flex gap-5 items-center"
          >
            <AiOutlineLogout size={30} />
            <p>Logout</p>
          </button>
        </div>
      </div>
      <div
        onClick={onCloseSidebar}
        className={`bg-black/60 z-[5] fixed top-0 left-0 w-full h-full md:opacity-0 transition duration-300 ${isSidebarActive ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      ></div>
    </>
  );
};

export default Sidebar;
