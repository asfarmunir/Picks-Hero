"use client";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineArrowUpward } from "react-icons/md";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
import { dashboardTabs } from "@/lib/constants";
import BetHistory from "@/components/shared/BetHistory";
import Objectives from "@/components/shared/Objectives";

const page = () => {
  const [tab, setTab] = React.useState("stats");

  const changeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <>
      {/* <div
        className=" sticky 
        top-0
        z-50
        w-full
        "
      >
        <div className=" w-[99%] bg-primary justify-between flex items-center absolute">
          <h1 className=" ml-4  text-white inline-flex items-center gap-2 font-thin 2xl:text-lg">
            <Image src="/icons/home.svg" alt="Logo" width={20} height={20} />
            Home
          </h1>
          <Navbar />
        </div>
      </div> */}
      <div className=" pt-16 relative px-5 2xl:px-8 2xl:mt-4 pb-24 text-white  max-h-full overflow-auto space-y-6 ">
        <div className="w-full flex-col md:flex-row  flex items-center justify-between gap-4">
          <div className="flex flex-col  items-start justify-start  w-full md:w-fit  ">
            <h3 className="text-lg 2xl:text-xl font-bold">Account Dashboard</h3>
            <p className=" text-sm text-[#848BAC]">
              Track performance and review your data.
            </p>
          </div>
          <div className="flex w-full md:w-fit items-center gap-2 flex-col md:flex-row">
            <button className="flex justify-center items-center gap-2 px-4 py-2 text-sm w-full md:w-fit 2xl:text-base font-bold bg-[#333547] shadow-inner shadow-gray-600 rounded-lg">
              <Image
                src="/icons/help-white.svg"
                alt="Arrow Icon"
                width={20}
                height={20}
              />
              PAYOUTS EXAPLINED
            </button>
            <button className="flex justify-center uppercase items-center gap-2 px-4 py-2 text-sm w-full md:w-fit 2xl:text-base font-bold bg-[#333547] inner-shadow rounded-lg">
              <Image
                src="/icons/stack.png"
                alt="Arrow Icon"
                width={18}
                height={18}
              />
              Request Payout
            </button>
          </div>
        </div>
        {/* <div className="p-8  pb-48 md:pb-12 overflow-hidden relative min-h-48 2xl:min-h-56 rounded-2xl w-full bg-primary-100 flex flex-col gap-3 ">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2">
            <h1 className="text-3xl 2xl:text-4xl font-bold">
              BET SPORTS WITH OUR
            </h1>
            <Image
              src="/images/money.png"
              alt="Football Icon"
              width={110}
              className=" -mt-9 mr-12 sm:mr-0 sm:mt-0"
              height={110}
            />
          </div>
          <p className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
            Lower risk, higher rewards, bet with our capital
          </p>
          <Dialog>
            <DialogTrigger className=" w-fit text-sm 2xl:text-base rounded-xl inner-shadow px-4 py-3 inline-flex items-center gap-3">
              <Image
                src="/icons/video.svg"
                alt="Arrow Icon"
                width={15}
                height={15}
              />
              <span>How it works</span>{" "}
            </DialogTrigger>
            <DialogContent className=" bg-primary-100 gap-1 py-12 text-white border-none md:min-w-[700px] 2xl:min-w-[900px] flex flex-col items-center">
              <h2 className=" text-3xl font-bold">HOW IT WORKS</h2>
              <DialogDescription>
                You can find more information on our help tab
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <Image
            src="/images/hero.png"
            alt="Hero Image"
            width={700}
            height={700}
            className=" absolute bottom-0 right-0  md:-right-20 md:-bottom-28"
          />
        </div> */}
        {/* <div className="flex flex-col md:flex-row items-center gap-8">
          <div className=" p-3 pb-8 md:p-8 md:pb-8 overflow-hidden relative min-h-32 2xl:min-h-44 rounded-2xl w-full bg-primary-100 flex flex-col gap-1 ">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                TOTAL FUNDED AMOUNT
              </p>
              <Image
                src="/icons/arrow.svg"
                alt="Arrow Icon"
                width={30}
                className=" border-2 border-gray-600 rounded-lg bg-[#272837] p-0.5"
                height={30}
              />
            </div>
            <div className=" flex items-center gap-4">
              <Image
                src="/icons/funded.svg"
                alt="Arrow Icon"
                width={45}
                height={45}
              />
              <p className="   md:mt-0  text-4xl font-semibold">$45,865.55</p>
            </div>
          </div>
          <div className=" p-3 pb-8 md:p-8 md:pb-8 overflow-hidden relative min-h-32 2xl:min-h-44 rounded-2xl w-full bg-primary-100 flex flex-col gap-1 ">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                Total Payout Amount
              </p>
              <Image
                src="/icons/arrow.svg"
                alt="Arrow Icon"
                width={30}
                className=" border-2 border-gray-600 rounded-lg bg-[#272837] p-0.5"
                height={30}
              />
            </div>
            <div className=" flex items-center gap-4">
              <Image
                src="/icons/payout.svg"
                alt="Arrow Icon"
                width={45}
                height={45}
              />
              <p className="   md:mt-0  text-4xl font-semibold">$45,865.55</p>
            </div>
          </div>
        </div>
        <div className=" w-full space-y-5 bg-primary-100 py-6 px-2 md:p-8  rounded-2xl 2xl:p-6">
          <div className=" w-full flex flex-col gap-3 md:flex-row items-center  justify-between">
            <h2 className=" text-xl font-bold">ACCOUNTS OVERVIEW</h2>
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-fit">
              <button className=" bg-[#272837]   justify-center  w-full md:w-fit text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
                <Image
                  src="/icons/check.png"
                  alt="Arrow Icon"
                  width={18}
                  height={18}
                />
                SHOW BREACHED
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className=" bg-[#272837]    justify-center w-full md:w-fit  text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
                  <Image
                    src="/icons/sort.png"
                    alt="Arrow Icon"
                    width={18}
                    height={18}
                  />
                  SORT
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg shadow-sm">
                  <DropdownMenuItem className="flex items-center justify-between ">
                    <p>SORT ITEMS</p>
                    <MdOutlineArrowUpward className="text-lg" />
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center justify-between ">
                    <p>FUNDED</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between ">
                    <p>SORT ITEMS</p>
                    <MdOutlineArrowUpward className="text-lg rotate-180" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href={"/create-account"}
                className="  shadow-green-400    justify-center w-full md:w-fit inner-shadow text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2"
              >
                <Image
                  src="/icons/add.png"
                  alt="Arrow Icon"
                  width={18}
                  height={18}
                />
                ADD ACCOUNT
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative  rounded-2xl w-full  flex flex-col gap-1 ">
              <div className=" w-full flex items-center justify-between">
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $1000
                </p>
                <Image
                  src="/icons/challenge.svg"
                  alt="Arrow Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT BALANCE
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $19,343.39
                </p>
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT NUMBER
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  #PH8823232-22
                </p>
              </div>
            </div>
            <div className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative  rounded-2xl w-full  flex flex-col gap-1 ">
              <div className=" w-full flex items-center justify-between">
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $1000
                </p>
                <Image
                  src="/icons/fund.svg"
                  alt="Arrow Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT BALANCE
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $19,343.39
                </p>
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT NUMBER
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  #PH8823232-22
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-4">
            <div className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative min-h-32 2xl:min-h-44 rounded-2xl w-full  flex flex-col gap-1 ">
              <div className=" w-full flex items-center justify-between">
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $1000
                </p>
                <Image
                  src="/icons/challenge.svg"
                  alt="Arrow Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT BALANCE
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $19,343.39
                </p>
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT NUMBER
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  #PH8823232-22
                </p>
              </div>
            </div>
            <div className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative min-h-32 2xl:min-h-44 rounded-2xl w-full  flex flex-col gap-1 ">
              <div className=" w-full flex items-center justify-between">
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $1000
                </p>
                <Image
                  src="/icons/fund.svg"
                  alt="Arrow Icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT BALANCE
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  $19,343.39
                </p>
              </div>
              <div className=" w-full flex items-center justify-between">
                <p className=" text-[#AFB2CA] text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                  ACCOUNT NUMBER
                </p>
                <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  #PH8823232-22
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex items-center justify-between">
          <div className="flex mt-4 items-center justify-evenly md:justify-start flex-wrap gap-2 mb-3">
            {dashboardTabs.map((curr, index) => (
              <button
                key={index}
                className={`border  
             px-4 text-xs 2xl:text-lg py-2 flex w-full md:w-fit justify-center  items-center flex-grow md:flex-grow-0 rounded-full ${
               tab === curr.tab
                 ? "border-[#52FC18] bg-[#1A5B0B]"
                 : " border-gray-700 text-[#848BAC] border-2"
             } font-semibold uppercase`}
                onClick={() => changeTab(curr.tab)}
              >
                <Image
                  src={tab === curr.tab ? curr.icon[0] : curr.icon[1]}
                  alt="Icon"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                {curr.title}
              </button>
            ))}
          </div>
          <button className="hidden md:flex justify-center uppercase items-center gap-2 px-4 py-2 text-sm w-full md:w-fit 2xl:text-base font-bold bg-[#333547] inner-shadow rounded-lg">
            <Image
              src="/icons/pick.png"
              alt="Arrow Icon"
              width={18}
              height={18}
            />
            PLACE PICK
          </button>
        </div>

        {/* <stats /> */}
        {/* <BetHistory /> */}
        {/* <Objectives /> */}

        {
          {
            stats: <Stats />,
            history: <BetHistory />,
            objectives: <Objectives />,
          }[tab]
        }
      </div>
    </>
  );
};

export default page;

const Stats = () => {
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className=" bg-[#181926] shadow-inner shadow-gray-700 font-bold rounded-lg text-white p-5 flex flex-col gap-2">
          <p className="text-[#848BAC] text-xs 2xl:text-sm font-bold">
            Number of picks
          </p>
          <h2 className="text-2xl 2xl:text-3xl ">${index + 1}00</h2>
        </div>
      ))}
    </div>
  );
};
