
import { FormEvent, FunctionComponent, useRef, useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";

interface SignInProps {
  setIsShowSignInBox: any;
}

const SignIn: FunctionComponent<SignInProps> = ({ setIsShowSignInBox }) => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.trim() || !password.trim()) return;

    // signIn("credentials", {
    //   email: form.values.email,
    //   password: form.values.password,
    //   redirect: false,
    // })
    //   .then((res: any) => {
    //     if (!res.ok) {
    //       toast.error("Tài khoản hoặc mật khẩu không chính xác");
    //     } else {
    //       close();
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Tài khoản hoặc mật khẩu không chính xác");
    //   });

    setIsLoading(true);
    console.log(email, password);
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
          <button className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300">
            Sign In
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
