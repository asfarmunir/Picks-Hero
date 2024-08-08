"use client";
import React from "react";
import Image from "next/image";
import { useState, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@radix-ui/react-checkbox";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name should be atleast 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name should be atleast 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password should be atleast 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password should be atleast 6 characters",
  }),
  country: z.string().min(2, {
    message: "Please enter a your country name",
  }),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      confirmPassword: "password",
      country: "USA",
    },
  });

  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <div className=" w-full flex items-start justify-center gap-20 pb-12">
      <div className="hidden md:flex  flex-col items-center justify-center gap-5 ">
        <div
          className="flex w-full items-center justify-between
         py-4 px-8 gap-12 bg-gradient-to-l from-white/5 to-white/0"
        >
          <div className="flex flex-col gap-2">
            <h2 className=" 2xl:text-xl text-white font-bold">
              TAKE A <span className="text-primary-50">CHALLENGE</span>
            </h2>
            <h4 className=" text-sm 2xl:text-lg text-white ">
              PROVE YOUR SKILLS
            </h4>
          </div>
          <div className="">
            <Image
              src="/images/challenge.svg"
              alt="hero"
              width={80}
              height={80}
              priority
              className=" w-[55px] 2xl:w-[70px] "
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between py-4 pl-8 pr-4 2xl:pr-3 gap-12 bg-gradient-to-l from-white/5 to-white/0">
          <div className="flex flex-col gap-2">
            <h2 className=" 2xl:text-xl text-white font-bold">
              UNLOCK <span className="text-primary-50">CAPITAL</span>
            </h2>
            <h4 className=" text-sm 2xl:text-lg text-white ">UPTO $100K</h4>
          </div>
          <div className="">
            <Image
              src="/images/lock.svg"
              alt="hero"
              width={80}
              height={80}
              priority
              className=" w-[80px] 2xl:w-[110px] "
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between py-4 px-8 gap-12 bg-gradient-to-l from-white/5 to-white/0">
          <div className="flex flex-col gap-2">
            <h2 className=" 2xl:text-xl text-white font-bold">
              PICK & <span className="text-primary-50">GET PAID </span>
            </h2>
            <h4 className=" text-sm 2xl:text-lg text-white ">
              50% OF THE PROFIT
            </h4>
          </div>
          <div className="">
            <Image
              src="/images/money.svg"
              alt="hero"
              width={80}
              height={80}
              priority
              className=" w-[55px] 2xl:w-[75px] "
            />
          </div>
        </div>
      </div>
      <div className=" bg-[#181926] mt-8 md:mt-0 flex flex-col items-start rounded-lg p-8 py-8  2xl:p-10 ">
        <h2 className=" text-2xl md:text-3xl font-bold text-white mb-2">
          CREATE YOUR ACCOUNT
        </h2>
        <p className=" max-w-md  text-[#848BAC] text-sm font-light">
          Welcome! Please enter your information below to create an account and
          get started.
        </p>

        <Form {...form}>
          <div
            id="first"
            className="flex flex-col  items-center justify-center w-full gap-6 md:gap-4  my-6"
          >
            <form
              id="container"
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full "
            >
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="block 2xl:text-[1.05rem] text-gray-300  mb-2.5">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter your first name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="block 2xl:text-[1.05rem] text-gray-300  mb-2.5">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=" enter your last name"
                          {...field}
                          className="  focus:ring-green-600/50 focus:ring-1 outline-offset-1  shadow  focus:border mr-0 md:mr-6  rounded-lg bg-[#333547]/60 w-full p-4  2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-[1.05rem] text-gray-300  mb-2.5">
                      Country
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="  shadow  focus:border mr-0 md:mr-6  rounded-lg bg-[#333547]/60 w-full p-4  2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight ">
                          <SelectValue placeholder=" select your country " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">America</SelectItem>
                          <SelectItem value="sysstem">UK</SelectItem>
                          <SelectItem value="sysstsem">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder=" enter your password"
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
                  <FormItem className="mb-6 w-full">
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
              <div className="flex items-center">
                <Checkbox />
                <label
                  htmlFor="terms"
                  className="text-xs 2xl:text-sm text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  By continuing, you agree to our{" "}
                  <span className="text-primary-50">Terms</span> and{" "}
                  <span className="text-primary-50">Privacy Policy</span>.
                </label>
              </div>
              <div className="flex flex-col w-full mt-2 items-center justify-center">
                <Button
                  type="submit"
                  className="bg-[#333547] mb-4 inner-shadow border border-[#28B601] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-6 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
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
                  <span className=" capitalize">LET'S GO</span>
                  {/* )} */}
                </Button>
              </div>
              <label
                htmlFor="terms"
                className="text-xs 2xl:text-sm text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Have an account?{" "}
                <Link href={"/login"} className="text-primary-50 pl-1">
                  Login
                </Link>
              </label>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default page;
