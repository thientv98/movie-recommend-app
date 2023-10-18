"use client"
import { FC, useState } from "react";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";

interface AuthProps { }

const Auth: FC<AuthProps> = () => {
  const [isShowSignInBox, setIsShowSignInBox] = useState(true);
  return (
    <>
      <div className="relative">
        <div className="min-h-screen">
          {!isShowSignInBox && <SignUp setIsShowSignInBox={setIsShowSignInBox} />}
          {isShowSignInBox && <SignIn setIsShowSignInBox={setIsShowSignInBox} />}
        </div>
      </div>

    </>
  );
};

export default Auth;
