import { useEffect, useState } from "react";

export const useCurrentViewportView = () => {
  if (typeof window !== "undefined") {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });

      return () =>
        window.removeEventListener("resize", () => {
          setWidth(window.innerWidth);
        });
    }, []);
    return { width, isMobile: width < 768 };
  }
  return { width: 0, isMobile: false };
};
