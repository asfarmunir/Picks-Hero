"use client";
import { picksTabs } from "@/lib/constants";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineArrowUpward } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import Navbar from "@/components/shared/Navbar";
import UserAccount from "@/components/shared/UserAccount";

const page = () => {
  const [tab, setTab] = React.useState("football");
  const [selectedBet, setSelectedBet] = React.useState<number | null>(null);
  const [betType, setBetType] = React.useState("single");
  const [odds, setOdds] = React.useState("american");

  const changeTab = (tab: string) => {
    setTab(tab);
  };

  const handlePick = (id: number) => {
    setSelectedBet(id);
  };

  return (
    <>
      <div
        className=" sticky 
        top-0
        z-50
        w-full
        "
      >
        <div className=" w-[99%] bg-primary justify-between flex items-center absolute">
          {/* <h1 className=" ml-4  text-white inline-flex items-center gap-2 font-thin 2xl:text-lg">
            <Image src="/icons/help.png" alt="Logo" width={20} height={20} />
            HELP
          </h1> */}
          <UserAccount />
          <Navbar />
        </div>
      </div>
      <div className=" pt-16 relative px-5 2xl:px-8 2xl:mt-4 pb-24 text-white  max-h-full overflow-auto space-y-6 ">
        <div className="flex mt-4 items-center pb-3 max-w-full overflow-auto justify-evenly md:justify-start  gap-2 mb-3">
          {picksTabs.map((curr, index) => (
            <button
              key={index}
              className={`border  
             px-4 text-xs 2xl:text-lg py-2 flex w-full md:w-fit justify-center text-nowrap  items-center flex-grow md:flex-grow-0 rounded-full ${
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
        <div className="w-full bg-[#181926] shadow-inner shadow-gray-700 rounded-xl p-5 py-7 flex-col md:flex-row  flex items-center justify-between gap-4">
          <div className="flex flex-col  items-start justify-start  w-full md:w-fit  ">
            <h3 className="text-lg 2xl:text-xl font-bold mb-1">Featured</h3>
            <p className="  text-xs 2xl:text-sm text-[#848BAC] max-w-md">
              Don't miss out on exclusive boosted odds and special in-play
              betting options available only for this feature event.
            </p>
          </div>
          <div className="flex w-full md:w-fit items-center gap-2 flex-col md:flex-row">
            <button className="flex justify-center items-center gap-2 p-3.5 text-sm w-full md:w-fit 2xl:text-base  bg-[#272837] shadow-inner shadow-gray-600 rounded-lg">
              <Image
                src="/icons/baltimore.png"
                alt="Arrow Icon"
                width={30}
                height={30}
                className="w-[20px] h-[20px]"
              />
              Baltimore Ravens
            </button>
            <p className=" p-1.5 text-sm px-2 rounded-full font-bold -mx-4 -my-4 z-30 text-primary-50 bg-green-700/30 border-green-700/40 border-2">
              vs
            </p>
            <button className="flex justify-center items-center gap-2 p-3.5 text-sm w-full md:w-fit 2xl:text-base  bg-[#272837] shadow-inner shadow-gray-600 rounded-lg">
              <Image
                src="/icons/kansas.png"
                alt="Arrow Icon"
                width={20}
                height={20}
              />
              Kansas City Chiefs
            </button>
            <button className="flex justify-center uppercase items-center gap-2 p-3.5 text-sm w-full md:w-fit 2xl:text-base font-bold bg-[#333547] inner-shadow rounded-lg">
              BET NOW
            </button>
          </div>
        </div>
        <div className=" w-full flex gap-5 flex-col-reverse md:flex-row  rounded-2xl  mb-8">
          <div className=" w-full transition-all border border-gray-700 rounded-xl bg-primary-100  flex flex-col">
            <div className="flex flex-col md:flex-row  mb-4 w-full items-center justify-between">
              <div className="flex  items-center gap-3 w-full p-2 md:p-6 md:pr-32 ">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" bg-[#393C53]    justify-center text-nowrap w-fit  text-xs md:text-sm px-3 md:px-4 py-3 font-bold rounded-lg inline-flex items-center gap-2">
                    TOP EARNERS
                    <FaAngleDown className=" text-lg" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg shadow-sm">
                    <DropdownMenuItem className="flex items-center justify-between ">
                      <p>TOP EARNERS</p>

                      <MdOutlineArrowUpward className="text-lg" />
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center justify-between ">
                      <p>AVERAGE</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between ">
                      <p>BOTTOM EARNERS</p>
                      <MdOutlineArrowUpward className="text-lg rotate-180" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>{" "}
                <div className=" bg-[#333547]/60 inline-flex  items-center py-1 px-2 rounded-lg">
                  <LuSearch className="w-7 h-7 text-[#848BAC] " />
                  <Input
                    className=" 
                bg-transparent
                text-[#848BAC]

                focus:outline-0
                focus:ring-0
                focus:border-none
                placeholder-slate-900 
                uppercase
                "
                    placeholder={"search..."}
                  />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="  bg-[#393C53]  font-bold   justify-center w-[95%] text-sm 2xl:text-base md:w-fit  p-3.5 md:mr-3  rounded-xl inline-flex items-center gap-2">
                  <Image
                    src="/icons/odds.png"
                    alt="Arrow Icon"
                    width={23}
                    height={23}
                  />
                  <span className="text-[#737897] ">Odds:</span>
                  AMERICAN
                  <FaAngleDown className=" text-lg ml-0.5 mb-0.5 " />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg text-xs 2xl:text-base">
                  <DropdownMenuItem className="flex items-center justify-between ">
                    <p> Decimal</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center justify-between ">
                    <p>American</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between ">
                    <p> Fractional</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>{" "}
            </div>

            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className=" bg-[#333547] text-[#848BAC] border-none">
                <TableRow className=" border-none">
                  <TableHead className="uppercase  font-bold text-start">
                    TIME
                  </TableHead>
                  <TableHead className="uppercase font-bold text-start">
                    TEAM & ODDS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className=" ">
                <TableRow className="">
                  <TableCell className=" font-semibold w-[160px] capitalize text-xs py-5 border-b border-gray-700 2xl:text-base text-start truncate">
                    8:20 PM (EST)
                  </TableCell>

                  <TableCell className=" w-full py-5 border-b border-gray-700 ">
                    <div
                      onClick={() => handlePick(1)}
                      className={`flex w-full cursor-pointer items-center gap-2`}
                    >
                      <div
                        className={`  ${
                          selectedBet === 1
                            ? " border border-primary-50/80 shadow shadow-green-700"
                            : ""
                        }  flex w-full text-start justify-between
                       items-center gap-5 p-3 text-sm  2xl:text-base  bg-[#272837]
                        shadow-inner shadow-gray-600 rounded-lg`}
                      >
                        <p className="flex items-center text-nowrap gap-1">
                          <Image
                            src="/icons/baltimore.png"
                            alt="Arrow Icon"
                            width={30}
                            height={30}
                            className="w-[20px] h-[20px]"
                          />
                          Baltimore Ravens
                        </p>

                        <span className=" ">2.99</span>
                      </div>
                      <p
                        className={`flex justify-center font-bold text-nowrap items-center gap-2 p-3 text-sm   2xl:text-base 
                       bg-[#272837] shadow-inner  ${
                         selectedBet === 1
                           ? " border border-primary-50/80 shadow shadow-green-700"
                           : ""
                       } shadow-gray-600 rounded-lg`}
                      >
                        x 3.19
                      </p>
                      <div
                        className={`  ${
                          selectedBet === 1
                            ? " border border-primary-50/80 shadow shadow-green-700"
                            : ""
                        }  flex w-full text-start justify-between
                       items-center gap-5 p-3 text-sm  2xl:text-base  bg-[#272837]
                        shadow-inner shadow-gray-600 rounded-lg`}
                      >
                        <p className="flex items-center text-nowrap gap-1">
                          <Image
                            src="/icons/kansas.png"
                            alt="Arrow Icon"
                            width={30}
                            height={30}
                            className="w-[20px] h-[20px]"
                          />
                          Kansas City Chiefs
                        </p>

                        <span className=" ">2.99</span>
                      </div>
                    </div>
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
          {selectedBet && (
            <div
              className={` w-full md:w-[65%]  border border-gray-700 p-4 rounded-xl bg-primary-100  flex flex-col`}
            >
              <div className="flex items-start gap-4 mb-8 md:items-center justify-between md:mb-5  flex-col md:flex-row w-full">
                <h2 className="font-bold text-lg uppercase">betting slip</h2>
                <div className="flex items-center border-gray-[#737897] rounded-lg bg-[#737897]/20">
                  <button
                    onClick={() => setBetType("single")}
                    className={` ${
                      betType === "single" ? "text-white" : "text-primary-200"
                    } text-xs font-bold p-2p px-3  uppercase border-r border-gray-700`}
                  >
                    single
                  </button>
                  <button
                    onClick={() => setBetType("combination")}
                    className={`text-xs font-bold p-2 px-3 uppercase ${
                      betType === "combination"
                        ? "text-white"
                        : "text-primary-200"
                    }`}
                  >
                    combination
                  </button>
                </div>
              </div>
              <div className="  ">
                <div className=" w-full mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/baltimore.png"
                      alt="Arrow Icon"
                      width={23}
                      height={23}
                    />
                    <p className="uppercase  text-sm">Baltimore Ravens</p>
                  </div>
                  <button onClick={() => setSelectedBet(null)}>
                    <Image
                      src="/icons/discard.png"
                      alt="Arrow Icon"
                      width={23}
                      height={23}
                    />
                  </button>
                </div>
                <div className=" w-full mb-4  rounded-xl text-primary-50 bg-[#52FC18]/20 p-3 flex items-center justify-between">
                  <p className="text-sm font-thin capitalize">money line</p>
                  <p className="font-bold">+105</p>
                </div>
                <div className="w-full flex items-center gap-3">
                  <div className="bg-[#272837] rounded-xl p-3.5 flex flex-col gap-2.5 flex-grow">
                    <p className=" text-xs font-thin text-primary-200">Pick</p>
                    <h2 className=" font-bold">0.00$</h2>
                  </div>
                  <div className="bg-[#272837] rounded-xl p-3.5 flex flex-col gap-2.5 flex-grow">
                    <p className=" text-xs font-thin text-primary-200">
                      To Win
                    </p>
                    <h2 className=" font-bold">0.00$</h2>
                  </div>
                </div>
                <div className=" w-full  mt-3 border-t border-gray-700 py-3 flex items-center justify-between">
                  <p className="text-sm  text-primary-200 font-thin     ">
                    OVERALL ODDS
                  </p>
                  <p className="font-bold">4.3</p>
                </div>
                <div className=" w-full mb-4  flex items-center - justify-between">
                  <p className="text-sm  text-primary-200 font-thin     ">
                    TO COLLECT
                  </p>
                  <p className="font-bold">0.00 USD</p>
                </div>
              </div>
              {betType === "combination" && (
                <div className="pt-4 border-t border-gray-700 ">
                  <div className=" w-full mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/kansas.png"
                        alt="Arrow Icon"
                        width={23}
                        height={23}
                      />
                      <p className="uppercase  text-sm"> Kansas city chiefs</p>
                    </div>
                    <Image
                      src="/icons/discard.png"
                      alt="Arrow Icon"
                      width={23}
                      height={23}
                    />
                  </div>
                  <div className=" w-full mb-4  rounded-xl text-primary-50 bg-[#52FC18]/20 p-3 flex items-center justify-between">
                    <p className="text-sm font-thin capitalize">money line</p>
                    <p className="font-bold">+105</p>
                  </div>
                  <div className="w-full flex items-center gap-3">
                    <div className="bg-[#272837] rounded-xl p-3.5 flex flex-col gap-2.5 flex-grow">
                      <p className=" text-xs font-thin text-primary-200">
                        Pick
                      </p>
                      <h2 className=" font-bold">0.00$</h2>
                    </div>
                    <div className="bg-[#272837] rounded-xl p-3.5 flex flex-col gap-2.5 flex-grow">
                      <p className=" text-xs font-thin text-primary-200">
                        To Win
                      </p>
                      <h2 className=" font-bold">0.00$</h2>
                    </div>
                  </div>
                  <div className=" w-full  mt-3 border-t border-gray-700 py-3 flex items-center justify-between">
                    <p className="text-sm  text-primary-200 font-thin     ">
                      OVERALL ODDS
                    </p>
                    <p className="font-bold">4.3</p>
                  </div>
                  <div className=" w-full mb-4  flex items-center - justify-between">
                    <p className="text-sm  text-primary-200 font-thin     ">
                      TO COLLECT
                    </p>
                    <p className="font-bold">0.00 USD</p>
                  </div>
                </div>
              )}

              <div className=" w-full  border-t border-gray-700 py-3 flex items-center justify-between">
                <button className=" p-3.5 px-4 uppercase font-bold bg-[#393C53] text-xs rounded-lg">
                  clear
                </button>
                <button className=" p-3.5 uppercase font-bold inner-shadow text-xs rounded-lg">
                  PLACE pick
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
