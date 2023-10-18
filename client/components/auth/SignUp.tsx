import { CREATE_USER } from "@/query/user.query";
import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { AiFillLock, AiFillMail, AiFillProfile } from "react-icons/ai";
import * as Yup from "yup";

interface SignUpProps {
  setIsShowSignInBox: any;
}

const SignUp: FC<SignUpProps> = ({ setIsShowSignInBox }) => {
  const [createUser] = useMutation(CREATE_USER);
  const [isLoading, setIsLoading] = useState(false);

  const signUpHandler = async (values: { [key: string]: string }) => {
    console.log(values);

    const createUserInput = {
      name: 'aaaaaaaaa',
    };

    const { data } = await createUser({
      variables: {
        createUserInput
      },
    })

    console.log(123, createUser, data);

    setIsLoading(false);
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
              className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300"
            >
              Register
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
