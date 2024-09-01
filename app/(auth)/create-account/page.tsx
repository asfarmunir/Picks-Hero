import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

const challenge = [
  {
    title: "Profit Target 20%",
    icons: "/icons/profit.png",
  },
  {
    title: "MAXIMUM LOSS",
    icons: "/icons/loss.png",
  },
  {
    title: "MAXIMUM DAILY LOSS",
    icons: "/icons/loss2.png",
  },
  {
    title: "Duration X Days",
    icons: "/icons/duration.png",
  },
  {
    title: "Minimum Number of Bets 20",
    icons: "/icons/check-green.png",
  },
  {
    title: "Maximum Bet Size 2% of initial capital",
    icons: "/icons/check-green.png",
  },
];

const page = async() => {
  // const session = await getServerSession(authOptions)
  // console.log('this is the session : ', session)
  return (
    <section className=" w-full flex flex-col md:flex-row text-white ">
      <div className="flex flex-col  gap-4 p-4 md:p-8 w-full md:max-w-[70%]">
        <h2 className=" text-xl md:text-3xl font-bold uppercase">
          Unlock Our Money To Bet With
        </h2>
        <p className=" text-[#848BAC] font-semibold ">
          Get paid 50% of the profits you make.
        </p>
        <div className=" w-full bg-[#181926]  flex flex-col md:flex-row md:items-center gap-6 px-8 py-7 rounded-xl shadow-inner shadow-gray-800">
          <div className="flex items-center gap-2">
            <p className=" 2xl:text-lg items-center flex justify-center font-bold w-7 2xl:w-8 h-7 2xl:h-8 rounded-full p-1 2xl:p-2 inner-shadow">
              1
            </p>
            <p className=" text-lg 2xl:text-xl font-bold">
              TAKE YOUR CHALLENGE
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className=" 2xl:text-lg items-center flex justify-center font-bold w-7 2xl:w-8 h-7 2xl:h-8 rounded-full p-1 2xl:p-2 inner-shadow">
              2
            </p>
            <p className=" text-lg 2xl:text-xl font-bold">UNLOCK CAPITAL</p>
          </div>
          <div className="flex items-center gap-2">
            <p className=" 2xl:text-lg items-center flex justify-center font-bold w-7 2xl:w-8 h-7 2xl:h-8 rounded-full p-1 2xl:p-2 inner-shadow">
              3
            </p>
            <p className=" text-lg 2xl:text-xl font-bold">PICK & GET PAID</p>
          </div>
        </div>
        <div className=" w-full bg-[#181926]  flex flex-col gap-1 px-8 py-7 rounded-xl shadow-inner shadow-gray-800">
          <h2 className="text-lg 2xl:text-xl font-bold "> Challenge</h2>
          <p className=" text-[#848BAC] text-sm md:text-base font-semibold ">
            Select if you want to complete the Challenge in one or two identical
            steps
          </p>

          <div className="flex items-center flex-col md:flex-row mt-10  gap-5 md:mt-4">
            <div className=" text-2xl relative w-full md:w-fit flex justify-center hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-8 py-2.5 rounded-full">
              1 STEP
              <Image
                src="/images/faster.png"
                alt="1 step"
                width={70}
                height={70}
                className=" absolute -top-2.5"
              />
            </div>
            <div className=" text-2xl relative w-full md:w-fit flex items-center justify-center  hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-8 py-2.5 rounded-full">
              2 STEPS
              <Image
                src="/images/cheaper.png"
                alt="1 step"
                width={70}
                height={70}
                className=" absolute -top-2.5"
              />
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#181926]  flex flex-col gap-1 px-8 py-7 rounded-xl shadow-inner shadow-gray-800">
          <h2 className="text-lg 2xl:text-xl font-bold "> ACCOUNT SIZE</h2>
          <div className="flex items-center flex-col md:flex-row mt-10  gap-5 md:mt-4">
            <div className=" text-2xl relative w-full md:w-fit flex justify-center hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-6 py-2.5 rounded-full">
              $1K
            </div>
            <div className=" text-2xl relative w-full md:w-fit flex items-center justify-center  hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-6 py-2.5 rounded-full">
              $2K
            </div>
            <div className=" text-2xl relative w-full md:w-fit flex items-center justify-center  hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-6 py-2.5 rounded-full">
              $5K
            </div>
            <div className=" text-2xl relative w-full md:w-fit flex items-center justify-center  hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-6 py-2.5 rounded-full">
              $10K
              <Image
                src="/images/popular.png"
                alt="1 step"
                width={70}
                height={70}
                className=" absolute -top-2.5"
              />
            </div>
            <div className=" text-2xl relative w-full md:w-fit flex items-center justify-center  hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-6 py-2.5 rounded-full">
              $20K
            </div>
            <div className=" text-2xl relative w-full md:w-fit flex items-center justify-center  hover:bg-[#1A5B0B] border-2 border-gray-800 cursor-pointer hover:border-2 hover:border-[#52FC18] font-bold px-6 py-2.5 rounded-full">
              $50K
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  gap-3 p-5 md:p-8 w-full md:max-w-[30%]">
        <h2 className=" text-xl md:text-3xl font-bold uppercase">
          REFUNDABLE FEE
        </h2>
        <p className="text-xs inline-flex w-full bg-[#52FC18]/15 rounded-xl gap-3 border border-[#52FC18]/20 py-2 px-3 items-center 2xl:text-sm text-[#F74418] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          <Image
            src="/icons/refund.svg"
            alt="line"
            width={20}
            height={20}
            className=""
          />
          <span className=" text-[#52FC18]">
            20% OFF Summer Sale. Ending Friday
          </span>
        </p>
        <div className=" w-full bg-[#181926]  flex flex-col md:flex-row md:items-center gap-6 px-8 py-7 rounded-xl shadow-inner shadow-gray-800">
          <div className="flex flex-col items-center ">
            <h2 className=" 2xl:text-4xl text-3xl  tracking-wide font-black ">
              <span className=" line-through text-[#848BAC]  ">$2000</span>{" "}
              {"  "}
              $1600
            </h2>
            <p className=" text-lg 2xl:text-xl uppercase  font-semibold">
              for $2000 account
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className=" inline-flex items-center gap-2">
            <Image
              src="/icons/check-green.png"
              alt="line"
              width={20}
              height={20}
              className=""
            />
            <h2 className=" font-bold text-sm 2xl:text-base text-nowrap uppercase">
              One-Time Fee
            </h2>
          </div>
          <div className=" inline-flex items-center gap-2">
            <Image
              src="/icons/refund.png"
              alt="line"
              width={20}
              height={20}
              className=""
            />
            <h2 className=" font-bold text-sm 2xl:text-base text-nowrap uppercase">
              100% Refundable
            </h2>
          </div>
        </div>
        <Link
          href={"/create-account/form"}
          className=" mb-1 inner-shadow border text-center border-[#28B601] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-3 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
        >
          <span className=" capitalize">GET STARTED</span>
        </Link>
        <p className="text-xs 2xl:text-sm text-gray-300 leading-snug font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          By clicking purchase, your agree to our{" "}
          <span className="text-primary-50">Terms</span> and{" "}
          <span className="text-primary-50">Privacy Policy.</span>
        </p>

        <div className=" w-full bg-[#181926] mt-4  flex flex-col gap-1 px-6 py-7 rounded-xl shadow-inner shadow-gray-800">
          <h2 className="text-lg 2xl:text-xl font-bold uppercase ">
            {" "}
            The Pickshero Challenge
          </h2>
          <div className="flex  flex-col  mt-6  gap-2.5 md:mt-4">
            {challenge.map((item, index) => (
              <div key={index} className="flex gap-2 md:gap-4 items-center ">
                <Image
                  src={item.icons}
                  alt="line"
                  width={20}
                  height={20}
                  className=""
                />
                <h2 className=" font-bold text-xs 2xl:text-base  uppercase">
                  {item.title}
                </h2>
              </div>
            ))}
            <div className="bg-[#333547] text-sm border border-[#21222e] w-full rounded-xl hover:bg-slate-600 mt-4 text-white font-semibold py-3 text-center px-10 2xl:text-lg   focus:outline-none focus:shadow-outline">
              <span className=" capitalize">Click here for more info</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
