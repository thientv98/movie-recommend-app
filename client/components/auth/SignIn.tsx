"use client"
import { FormEvent, FunctionComponent, useRef, useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
interface SignInProps {
  setIsShowSignInBox: any;
}

const SignIn: FunctionComponent<SignInProps> = ({ setIsShowSignInBox }) => {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.trim() || !password.trim()) return;

    setIsLoading(true)
    signIn("credentials", {
      email,
      password,
      test: "1",
      redirect: false,
    })
      .then((res) => {
        router.push('/')
      })
      .catch((err: any) => {
        toast.error(err?.message);
      });

    setIsLoading(true);
  };

  return (
    <>
      <div className="px-4 py-2 rounded-xl max-w-xl w-full min-h-[500px] text-white/70 tw-absolute-center">
        <div className="flex flex-col items-center mb-5">
          <div className="text-[50px] font-semibold mb-1 mx-auto">
            <div className="text-primary leading-none mb-4 text-center">
              Sign In
            </div>
          </div>
        </div>
        <form onSubmit={signInHandler}>
          <div className="relative mb-6">
            <input
              ref={emailRef}
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white"
            />
            <label
              htmlFor="email"
              className={`absolute left-5 text-gray-400 transition duration-500 pointer-events-none 
          -translate-y-1/2 visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out
          `}
            >
              Email
            </label>
            <AiOutlineMail
              size={25}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            />
          </div>
          <div className="relative mb-12">
            <input
              ref={passwordRef}
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white"
            />
            <label
              htmlFor="password"
              className={`absolute left-5 text-gray-400 transition duration-500 pointer-events-none 
          translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out
          `}
            >
              Password
            </label>
            <AiFillLock
              size={25}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            />
          </div>
          <button disabled={isLoading} className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300">
            {isLoading &&
              <>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
              </>}
            {!isLoading && <>
              Sign In
            </>}
          </button>
        </form>

        <p className="text-xl flex gap-2 mt-32 justify-center">
          <span>Not a member?</span>
          <button
            onClick={() => setIsShowSignInBox(false)}
            className="text-primary/90 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

export default SignIn;
