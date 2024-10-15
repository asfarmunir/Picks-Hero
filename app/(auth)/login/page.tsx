"use client";
import Image from "next/image";
import { createRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password should be atleast 6 characters",
  }),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [AuthError, setAuthError] = useState("");
  interface value {
    email: string;
    password: string;
  }
  const router = useRouter();
  async function onSubmit(values: value) {
    setIsLoading(true);

    try {
      recaptchaRef.current.reset();
      const token = await recaptchaRef.current?.executeAsync();
      if (token) {
        const apiQuery: any = await fetch(`/api/auth/verify-captcha/${token}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { success } = await apiQuery.json();
        if (success) {
          toast.success("Form submitted successfully");
        } else {
          toast.error("Form submission failed");
        }
      } else {
        toast.error("Error getting token");
      }
    } catch (error) {
      toast.error("Failed to verify captcha");
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.status !== 200) {
      setToggle(!toggle);

      setAuthError("Incorrect credentials please try again!");
    } else {
      router.push("/2fa-auth");
      setToggle(toggle);
    }
    setIsLoading(false);
  }

  // CAPTCHA VERIFICATION
  const recaptchaRef: any = createRef();

  const onChange = () => {
    // on captcha change
  };

  const asyncScriptOnLoad = () => {
    // console.log("Google recaptcha loaded just fine");
  };

  return (
    <div className=" w-full flex  md:items-center h-[90svh] overflow-hidden  justify-center gap-16 pb-4">
      <div className="hidden lg:block ">
        <Image
          src="/images/login hero.png"
          alt="login"
          width={400}
          height={400}
          priority
          className=" w-[390px]  2xl:w-[500px] 2xl:mt-20 "
        />
      </div>
      <div className=" bg-[#181926] shadow-inner shadow-gray-800 w-full sm:w-fit sm:min-w-[459px] 2xl:mt-6 2xl:min-w-[500px] mt-24 md:mt-0 flex flex-col items-start rounded-lg p-7 px-[2.18rem]    2xl:p-10 ">
        <h2 className=" text-xl md:text-2xl 2xl:text-3xl font-bold text-white mb-1 2xl:mb-2">
          WELCOME BACK!
        </h2>

        <Form {...form}>
          <div
            id="first"
            className="flex flex-col  items-center justify-center w-full gap-6 md:gap-4  mt-6"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-[1.1rem] text-gray-300  mb-2.5">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="  focus:ring-green-600/50 focus:ring-1 outline-offset-1  shadow  focus:border mr-0 md:mr-6  rounded-lg bg-[#333547]/60 w-full p-4  2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-[1.1rem] text-gray-300  mb-2.5">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        className="  focus:ring-green-600/50 focus:ring-1 outline-offset-1  shadow  focus:border mr-0 md:mr-6  rounded-lg bg-[#333547]/60 w-full p-4  2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!toggle ? (
                <Link
                  href={"/login/reset-password"}
                  className="text-xs 2xl:text-sm text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Forgot password?{"  "}
                  <span className="text-primary-50">Reset it</span>.
                </Link>
              ) : (
                <p className="text-xs inline-flex w-full bg-[#F74418]/15 rounded-xl gap-3 border border-[#F74418]/20 py-2 px-3 items-center 2xl:text-sm text-[#F74418] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <Image
                    src="/icons/alert.svg"
                    alt="line"
                    width={20}
                    height={20}
                    className=""
                  />
                  <span className=" text-[#F74418]">{AuthError}</span>
                </p>
              )}

              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LeQr1wqAAAAABFdff9ZpBeE5iAaeC89vV1TRWJP"
                onChange={onChange}
                asyncScriptOnLoad={asyncScriptOnLoad}
              />

              <div className="flex flex-col w-full mt-2 items-center justify-center">
                <Button
                  type="submit"
                  className="bg-[#333547] mb-4 inner-shadow border border-[#28B601] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-6 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                >
                  {isLoading ? (
                    <ColorRing
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                      ]}
                    />
                  ) : (
                    <span className=" capitalize">LOG IN</span>
                  )}
                </Button>
                <Image
                  src="/images/divider.png"
                  alt="line"
                  width={400}
                  height={400}
                  className=" my-2"
                />
                <Link
                  href={"/signup"}
                  className="bg-[#333547]  border border-[#21222e] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-3 text-center px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                >
                  <span className=" capitalize">SIGN UP</span>
                </Link>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default page;
