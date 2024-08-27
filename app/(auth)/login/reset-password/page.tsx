"use client";
import React from "react";
import Image from "next/image";
import { useState, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password should be atleast 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Please re-enter your password",
  }),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "password",
      confirmPassword: "password",
    },
  });

  const [progress, setProgress] = useState<number>(0);
  const [validation, setValidation] = useState<boolean>(false);
  async function onSubmit(values: any) {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      setValidation(true);
      return;
    }
    setProgress(progress + 1);
  }

  return (
    <div className=" w-full flex h-[70svh]  items-center mt-[4rem] justify-center gap-16 pb-4">
      {progress < 2 ? (
        <div className=" bg-[#181926] w-full sm:w-fit sm:min-w-[459px] 2xl:mt-6 2xl:min-w-[500px] mt-24 md:mt-0 flex flex-col items-start rounded-lg p-7 px-[2.18rem]    2xl:p-10 ">
          <h2 className=" text-xl md:text-2xl 2xl:text-3xl font-bold text-white mb-1 2xl:mb-2">
            RESET YOUR PASSWORD
          </h2>
          {progress === 0 && (
            <p className=" max-w-md  text-[#848BAC] text-sm mb-5 font-light">
              Please enter your email to receive further instructions.
            </p>
          )}

          {progress === 0 && (
            <Form {...form}>
              <div
                id="first"
                className="flex flex-col  items-center justify-center w-full gap-6 md:gap-4  mt-6"
              >
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" w-full "
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="block 2xl:text-[1.05rem] text-gray-300  mb-2.5">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=" enter your email"
                            {...field}
                            className="  focus:ring-green-600/50 focus:ring-1 outline-offset-1  shadow  focus:border mr-0 md:mr-6  rounded-lg bg-[#333547]/60 w-full p-4  2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col w-full mt-2 items-center justify-center">
                    <Button
                      type="submit"
                      className="bg-[#333547] mb-4 inner-shadow border border-[#28B601] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-5 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                    >
                      {/* {isLoading ? (
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
                  ) : ( */}
                      <span className=" capitalize">SUBMIT</span>
                      {/* )} */}
                    </Button>
                  </div>
                </form>
              </div>
            </Form>
          )}

          {progress === 1 && (
            <Form {...form}>
              <div
                id="first"
                className="flex flex-col  items-center justify-center w-full gap-6 md:gap-4  mt-6"
              >
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" w-full "
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="block 2xl:text-[1.05rem] text-gray-300  mb-2.5">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="enter your password"
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="block 2xl:text-[1.05rem] text-gray-300  mb-2.5">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=" re-enter your password"
                            {...field}
                            className="  focus:ring-green-600/50 focus:ring-1 outline-offset-1  shadow  focus:border mr-0 md:mr-6  rounded-lg bg-[#333547]/60 w-full p-4  2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {validation && (
                    <p className="text-xs inline-flex w-full bg-[#F74418]/15 rounded-xl gap-3 border border-[#F74418]/20 py-2 px-3 items-center 2xl:text-sm text-[#F74418] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <Image
                        src="/icons/alert.svg"
                        alt="line"
                        width={20}
                        height={20}
                        className=""
                      />
                      <span className=" text-[#F74418]">
                        Passwords do not match
                      </span>
                    </p>
                  )}

                  <div className="flex flex-col w-full mt-2 items-center justify-center">
                    <Button
                      type="submit"
                      className="bg-[#333547] mb-4 inner-shadow border border-[#28B601] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-5 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                    >
                      {/* {isLoading ? (
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
                  ) : ( */}
                      <span className=" capitalize">SUBMIT</span>
                      {/* )} */}
                    </Button>
                    <p className="text-xs 2xl:text-sm text-start w-full mt-2 text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Didn’t get the email?{" "}
                      <span className="text-primary-50">Resend it</span>.
                    </p>
                  </div>
                </form>
              </div>
            </Form>
          )}
        </div>
      ) : (
        <div className=" bg-[#181926] w-full sm:w-fit  sm:min-w-[459px] 2xl:mt-6 2xl:min-w-[500px] mt-24 md:mt-0 flex flex-col items-center justify-center rounded-lg p-10 px-[2.18rem]   ">
          <Image
            src="/icons/success.svg"
            alt="line"
            width={100}
            height={100}
            className=" my-6"
          />
          <h2 className="text-xl uppercase md:text-2xl 2xl:text-3xl mb-4 font-bold text-center text-white">
            password reset successfully!
          </h2>
          <p className=" text-center max-w-md  text-[#848BAC] text-xs mb-6 2xl:text-sm font-light">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
