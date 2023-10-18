"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiOutlineMenu } from 'react-icons/ai';
import Sidebar from '@/components/common/Sidebar';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex md:hidden justify-between items-center px-5 my-5">
          <Link href="/" className="flex gap-2 items-center">
            <LazyLoadImage
              src="/images/logo.png"
              alt='logo'
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-xl text-white font-medium tracking-wider uppercase">
              Moon<span className="text-primary">light</span>
            </p>
          </Link>
          <button onClick={() => setIsSidebarActive((prev) => !prev)}>
            <AiOutlineMenu size={25} />
          </button>
        </div>

        <div className="flex items-start">
          <Sidebar
            isSidebarActive={isSidebarActive}
            onCloseSidebar={() => setIsSidebarActive(false)}
          />

          <div
            className="flex-grow md:pt-7 pt-0 pb-7 border-x md:px-[2vw] px-[4vw] border-gray-darken min-h-screen"
          >
            <div className="flex justify-between md:items-end items-center">
              <div className="inline-flex gap-[40px] pb-[14px] border-b border-gray-darken relative">
              </div>
              <div className="flex gap-6 items-center">

                <p>Anonymous</p>
                <LazyLoadImage
                  src="/images/defaultAvatar.jpg"
                  alt="User avatar"
                  className="w-7 h-7 rounded-full object-cover"
                  effect="opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {children}
          </div>
        </div>

      </body>
    </html>
  )
}
