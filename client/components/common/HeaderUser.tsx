import { FunctionComponent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSession } from "next-auth/react";

interface HeaderUserProps {
}

const HeaderUser: FunctionComponent<HeaderUserProps> = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between md:items-end items-center">
      <div className="inline-flex gap-[40px] pb-[14px] border-b border-gray-darken relative">
      </div>
      <div className="flex gap-6 items-center">

        <p>{session ? session.user?.name : 'Anonymous'}</p>
        <LazyLoadImage
          src="/images/defaultAvatar.jpg"
          alt="User avatar"
          className="w-7 h-7 rounded-full object-cover"
          effect="opacity"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

export default HeaderUser;
