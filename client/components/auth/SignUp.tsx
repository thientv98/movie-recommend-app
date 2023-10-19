import { CREATE_USER } from "@/grapql/user.query";
import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AiFillLock, AiFillMail, AiFillProfile } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface SignUpProps {
  setIsShowSignInBox: Dispatch<SetStateAction<boolean>>
}

const SignUp: FC<SignUpProps> = ({ setIsShowSignInBox }) => {
  const [createUser] = useMutation(CREATE_USER);
  const [isLoading, setIsLoading] = useState(false);

  const signUpHandler = async (values: { [key: string]: string }) => {
    setIsLoading(true)
    try {
      await createUser({
        variables: {
          createUserInput: values
        },
      })
      setIsLoading(false);
      setIsShowSignInBox(true)
      toast.success("Sign Up Successfully");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="px-4 py-2 rounded-xl max-w-xl w-full min-h-[500px] text-white/70 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center mb-5">
          <div className="text-[50px] font-semibold mb-1 mx-auto">
            <div className="text-primary leading-none mb-4 text-center">
              Create Account
            </div>
          </div>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(50, "Must be 50 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("Required")
              .min(6, "Password is too short - should be 6 chars minimum."),
          })}
          onSubmit={signUpHandler}
        >
          <Form>
            <div className="relative mb-6">
              <Field
                name="name"
                type="text"
                id="name"
                placeholder="Name"
                className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white"
              />
              <label
                htmlFor="name"
                className={`absolute left-5 text-gray-400 transition duration-500 pointer-events-none 
                  translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out
                  `}
              >
                Name
              </label>
              <AiFillProfile
                size={25}
                className="absolute top-1/2 -translate-y-1/2 right-4"
              />
              <p className="absolute top-[95%] left-[3%] text-red-600">
                <ErrorMessage name="name" />
              </p>
            </div>
            <div className="relative mb-6">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white"
              />
              <label
                htmlFor="email"
                className={`absolute left-5 text-gray-400 transition duration-500 pointer-events-none 
                  translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out
                  `}
              >
                Email
              </label>
              <AiFillMail
                size={25}
                className="absolute top-1/2 -translate-y-1/2 right-4"
              />
              <p className="absolute top-[95%] left-[3%] text-red-600">
                <ErrorMessage name="email" />
              </p>
            </div>
            <div className="relative mb-12">
              <Field
                name="password"
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
              <p className="absolute top-[95%] left-[3%] text-red-600">
                <ErrorMessage name="password" />
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300"
            >
              {isLoading &&
                <>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </>}
              {!isLoading && <>
                Sign up
              </>}
            </button>
          </Form>
        </Formik>
        <p className="text-xl flex gap-2 mt-32 justify-center">
          <span>Already a member?</span>
          <button
            onClick={() => setIsShowSignInBox(true)}
            className="text-primary/90 underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

export default SignUp;
