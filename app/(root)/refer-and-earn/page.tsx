"use client";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

const page = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className=" hidden md:block sticky 
        top-0
        z-50
        w-full
        "
      >
        <div className=" w-[99%] bg-primary justify-between flex items-center absolute">
          <h1 className=" ml-4 uppercase  text-white inline-flex items-center gap-2 font-semibold 2xl:text-lg">
            <Image src="/icons/refer.svg" alt="Logo" width={20} height={20} />
            refer & earn
          </h1>
          <Navbar />
        </div>
      </div>
      <div className=" w-full  flex  text-white gap-4 mt-1 md:mt-9 p-5 md:p-8 pb-24 max-h-full overflow-auto">
        <div className=" w-full  md:w-[70%] h-full shadow-inner shadow-gray-800 flex flex-col gap-7  bg-[#181926] p-4 md:p-6 rounded-xl">
          <div className=" w-full items-center flex justify-between">
            <h2 className=" text-2xl 2xl:text-3xl font-bold uppercase text-white">
              refer & earn
            </h2>
            <button className=" hover:border hover:border-primary-200 text-white font-semibold uppercase text-sm bg-[#333547]  px-4 py-2 rounded-lg inline-flex items-center gap-2">
              <Image src="/icons/info.png" alt="Edit" width={17} height={17} />
              Learn more
            </button>
          </div>
          <div className=" border-2 border-[#52FC18]/40 bg-[#52FC18]/15 p-3 md:p-7 rounded-2xl w-full  flex flex-col md:flex-row gap-3  items-center justify-between  ">
            <h2 className=" font-bold text-lg text-[#848BAC]">
              Code:
              <span className="text-primary-50 ml-1">7HeR0PiCk2LmNOpQ456</span>
            </h2>
            <button className=" text-white  inner-shadow font-semibold hover:border hover:border-primary-200 uppercase text-xs md:text-base 2xl:text-lg bg-[#333547]  px-5 py-3 rounded-xl   inline-flex items-center gap-3">
              <Image src="/icons/copy.png" alt="Edit" width={18} height={18} />
              COPY LINK
            </button>{" "}
          </div>
          <div className=" bg-[#272837] p-3 md:p-7 rounded-2xl w-full  flex flex-col md:flex-row  items-center justify-between gap-3 ">
            <h2 className=" font-bold  text-[#848BAC]">
              Your commission: <span className="text-white ml-1">15%</span>
            </h2>
            <Sheet>
              <SheetTrigger
                className="text-white font-semibold hover:border
             hover:border-primary-200 uppercase text-xs md:text-base 2xl:text-lg bg-[#333547]  
             px-5 py-3 rounded-lg  shadow-inner shadow-gray-500 inline-flex items-center gap-3"
              >
                <Image
                  src="/icons/trophy.png"
                  alt="Edit"
                  width={18}
                  height={18}
                />
                VIEW MILESTONES
              </SheetTrigger>
              <SheetContent className="bg-primary text-white border-none">
                <div className="bg-[#181926] h-full flex flex-col p-4 gap-2 overflow-auto max-h-full">
                  <h2 className="text-3xl font-bold mb-5">MILESTONES</h2>
                  <div className="flex flex-col items-center p-3 py-7 rounded-2xl shadow-inner shadow-gray-700 gap-3 bg-[#050614]">
                    <Image
                      src="/images/p1.png"
                      alt="Edit"
                      width={60}
                      className="mb-2"
                      height={60}
                    />
                    <h2 className="text-xl font-bold">
                      {" "}
                      <span className="text-primary-50 mr-1">10</span> REFERRALS
                    </h2>
                    <p className="text-sm font-thin text-center">
                      Get a $50 bonus on top of your commissions
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-3 py-7 rounded-2xl shadow-inner shadow-gray-700 gap-3 bg-[#050614]">
                    <Image
                      src="/images/p2.png"
                      alt="Edit"
                      width={70}
                      className="mb-2"
                      height={70}
                    />
                    <h2 className="text-xl font-bold">
                      {" "}
                      <span className="text-primary-50 mr-1">50</span> REFERRALS
                    </h2>
                    <p className="text-sm font-thin text-center">
                      UPGRADE FROM 15% TO 20% <br /> COMMISSONS
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-3 py-7 rounded-2xl shadow-inner shadow-gray-700 gap-3 bg-[#050614]">
                    <Image
                      src="/images/p3.png"
                      alt="Edit"
                      width={70}
                      className="mb-2"
                      height={70}
                    />
                    <h2 className="text-xl font-bold">
                      {" "}
                      <span className="text-primary-50 mr-1">100</span>{" "}
                      REFERRALS
                    </h2>
                    <p className="text-sm font-thin text-center px-4">
                      BECOME AN OFFICIAL PICKSHERO PARTNER. GET OPTIONS TO MAKE
                      EVEN MORE MONEY.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className=" bg-primary p-1.5 w-full flex items-center rounded-lg">
            <button
              onClick={() => setToggle(false)}
              className={` ${
                !toggle ? "bg-[#393C53] " : "bg-transparent text-[#848BAC]"
              } h-full w-full font-bold text-center 
            rounded-lg uppercase py-2 `}
            >
              TOTAL AVAILABLE
            </button>
            <button
              onClick={() => setToggle(true)}
              className={` ${
                toggle ? "bg-[#393C53] " : "bg-transparent text-[#848BAC]"
              } h-full w-full font-bold text-center 
            rounded-lg uppercase py-2 `}
            >
              {" "}
              TOTAL PAYOUT
            </button>
          </div>
          <div className=" w-full space-y-5 bg-primary-100   rounded-2xl  mb-8">
            <div className=" bg-[#272837] p-3 pb-8 md:p-7   rounded-2xl w-full  flex  items-start justify-between gap-1 ">
              <div className="flex flex-col gap-1">
                <p className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                  Total EARNED
                </p>
                <div className=" flex items-center gap-4">
                  <Image
                    src="/icons/funded.svg"
                    alt="Arrow Icon"
                    width={45}
                    height={45}
                  />
                  <p className="   md:mt-0 text-3xl  2xl:text-4xl font-semibold">
                    $45,865.55
                  </p>
                </div>
              </div>
              <button className=" text-white  inner-shadow font-semibold hover:border hover:border-primary-200 uppercase text-[10px] text-nowrap md:text-base 2xl:text-lg bg-[#333547]  px-5 py-3 rounded-xl   inline-flex items-center gap-3">
                <Image
                  src="/icons/stack.png"
                  alt="Edit"
                  width={20}
                  className="hidden md:block"
                  height={20}
                />
                REQUEST PAYOUT
              </button>{" "}
            </div>
            <div className=" w-full border border-gray-700 rounded-xl  flex flex-col">
              <div className="flex items-center justify-between w-full p-6 ">
                <h3 className=" text-lg font-bold">REFERAL HISTORY</h3>
              </div>
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className=" bg-[#333547] text-[#848BAC] border-none">
                  <TableRow className=" border-none">
                    <TableHead className="uppercase  font-bold text-center">
                      Date
                    </TableHead>
                    <TableHead className="uppercase font-bold text-center">
                      ORDER VALUE
                    </TableHead>
                    <TableHead className="uppercase font-bold text-center">
                      ORDER NUMBER
                    </TableHead>
                    <TableHead className="uppercase font-bold text-center">
                      COMMISSION
                    </TableHead>
                    <TableHead className="uppercase font-bold text-center">
                      STATUS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className=" border-none">
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      07 jul 2024 at 34:23pm
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      $2342
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      12345678
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      $10.00
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[140px] capitalize text-xs 2xl:text-base flex items-center justify-center truncate">
                      <p className=" px-2 py-1 bg-green-500/20 text-green-500 border border-green-500 rounded-full">
                        paid
                      </p>
                    </TableCell>
                  </TableRow>
                  <TableRow className=" border-none">
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      07 jul 2024 at 34:23pm
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      $2342
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      12345678
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                      $10.00
                    </TableCell>
                    <TableCell className=" font-semibold max-w-[140px] capitalize text-[0.25rem] 2xl:text-base flex items-center justify-center truncate">
                      <p className=" px-2 py-1 text-[10px]  text-[#AFB2CA] border border-gray-700 rounded-full">
                        OUTSTANDING
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex items-center justify-between p-5">
                <h4 className="text-[#848BAC] font-thin text-xs 2xl:text-base ">
                  PAGE 1-5
                </h4>
                <div className="flex gap-2 items-center">
                  <button className="text-[#848BAC] text-2xl">
                    <TiArrowLeft />
                  </button>
                  <button className="text-[white] text-2xl">
                    <TiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden md:block md:w-[30%]   ">
          <Image
            src="/images/profile-hero.png"
            alt="Ads"
            width={270}
            priority
            height={250}
            className=" rounded-lg  
            2xl:w-[340px] 
              "
          />
        </div>
      </div>
    </>
  );
};

export default page;
