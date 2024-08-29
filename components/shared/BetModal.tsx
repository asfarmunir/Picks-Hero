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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
const BetModal = () => {
  return (
    <Dialog>
      <DialogTrigger
        className=" flex text-white  justify-center uppercase
               items-center gap-2 py-2.5 px-3.5 text-sm w-full md:w-fit  font-bold bg-[#333547]  rounded-lg"
      >
        <Image
          src="/icons/bet.png"
          alt="Arrow Icon"
          width={105}
          height={105}
          className="w-[15px] h-[15px]"
        />
        BET HISTORY{" "}
      </DialogTrigger>
      <DialogContent className=" bg-primary-100 gap-1 p-5 text-white border-none  md:max-w-[1300px] 2xl:min-w-[1400px] flex flex-col ">
        <h2 className=" text-3xl font-bold mt-2 mb-5">BET HISTORY</h2>

        <div className=" w-full border bg-primary-100 border-gray-700 rounded-xl  flex flex-col">
          <div className="flex items-center justify-between w-full p-6 ">
            <div className="flex items-center gap-2">
              <button
                className={`border  
             px-6 text-xs 2xl:text-lg py-2 flex w-full md:w-fit justify-center  items-center flex-grow md:flex-grow-0 rounded-full ${
               true
                 ? "border-[#52FC18] bg-[#1A5B0B]"
                 : " border-gray-700 text-[#848BAC] border-2"
             } font-semibold uppercase`}
                //   onClick={() => changeTab(curr.title)}
              >
                Open
              </button>
              <button
                className={`border  
             px-6 text-xs 2xl:text-lg py-2 flex w-full md:w-fit justify-center  items-center flex-grow md:flex-grow-0 rounded-full ${
               true
                 ? " border-gray-700 text-[#848BAC] border-2"
                 : "border-[#52FC18] bg-[#1A5B0B]"
             } font-semibold uppercase`}
                //   onClick={() => changeTab(curr.title)}
              >
                Close
              </button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className=" bg-[#272837] shadow-inner shadow-gray-700   justify-center  md:w-fit  text-xs 2xl:text-base px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
                <Image
                  src="/icons/sort.png"
                  alt="Arrow Icon"
                  width={15}
                  height={15}
                />
                Sort
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mr-12   bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg shadow-gray-700 shadow-sm">
                <DropdownMenuItem className="flex text-xs 2xl:text-base items-center justify-between ">
                  <p>LAST 7 DAYS</p>
                  {/* <MdOutlineArrowUpward className="text-lg" /> */}
                </DropdownMenuItem>

                <DropdownMenuItem className="flex text-xs 2xl:text-base items-center justify-between ">
                  <p>LAST 14 DAYS</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex text-xs 2xl:text-base items-center justify-between ">
                  <p>LAST 30 DAYS</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className=" bg-[#333547] text-[#848BAC] border-none">
              <TableRow className=" border-none">
                <TableHead className="uppercase  font-bold text-center text-xs 2xl:text-sm">
                  id
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  sport
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  event
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  league
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  your pick
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  odds
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  pick
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  outcome
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  payout
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  date
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  game date
                </TableHead>
                <TableHead className="uppercase font-bold text-center text-xs 2xl:text-sm">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className=" border-none">
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  29523
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  BASKETBALL
                </TableCell>
                <TableCell className=" font-semibold max-w-[120px] capitalize text-xs 2xl:text-sm text-center truncate">
                  Minnesota Timeberwolves vs Daalas Mavericks
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  NBA
                </TableCell>
                <TableCell className=" font-semibold max-w-[120px] capitalize text-xs 2xl:text-sm text-center truncate">
                  POINT SPREAD DALLAS MAVERICKS +4.5
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  -110
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  1000
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm flex items-center justify-center truncate">
                  <p className=" px-2 py-1 bg-green-500/20 text-green-500 border mt-2 border-green-500 rounded-full">
                    paid
                  </p>
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  $12000
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center ">
                  MAY 29, 01:36PM
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center ">
                  MAY 29, 01:36PM
                </TableCell>
                <TableCell className=" font-semibold  capitalize text-xs 2xl:text-sm text-center ">
                  <Dialog>
                    <DialogTrigger className=" w-fit text-xs 2xl:text-sm text-nowrap rounded-xl inner-shadow px-4 py-3 inline-flex items-center gap-3">
                      <span className=" font-bold uppercase">Bet slip</span>{" "}
                    </DialogTrigger>
                    <DialogContent className=" bg-primary-100 gap-1 p-5 text-white border-none  md:max-w-[1200px] 2xl:min-w-[1300px] flex flex-col ">
                      <h2 className=" text-3xl font-bold mb-5">BET SLIP</h2>
                      <div className="flex items-start justify-center gap-5 2xl:mb-6 w-full">
                        <div className="flex flex-col space-y-3 items-center bg-[#272837] shadow-inner shadow-slate-700 rounded-xl px-3.5 py-5">
                          <div className=" w-full flex items-center justify-between gap-6">
                            <p className=" text-lg font-bold uppercase">
                              2 PICKS TO WIN
                              <span className="text-primary-50 ml-1.5">
                                $500.00
                              </span>
                            </p>
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#C02FF5]/20 border border-[#C02FF5] text-xs 2xl:text-sm">
                              IN PROGRESS
                            </p>
                          </div>
                          <div className="flex flex-col max-h-44 2xl:max-h-56 mt-1 overflow-auto px-1 w-full gap-3 ">
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full pt-2">
                            <p className="  font-bold text-primary-200">ODDS</p>
                            <p className="  font-bold ">2.32</p>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <p className="  font-bold text-primary-200">
                              STAKE
                            </p>
                            <p className="  font-bold ">$10,000</p>
                          </div>
                          <div className="flex items-center justify-between w-full border-b pb-3.5 border-slate-700">
                            <p className="  font-bold text-primary-200">
                              WINNIG
                            </p>
                            <p className="  font-bold ">$26,600</p>
                          </div>
                          <div className="flex w-full px-4 py-2 items-center justify-between">
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#737897]/20 border border-[#737897] text-xs 2xl:text-sm">
                              20-03-2024
                            </p>
                            <Image
                              src="/images/logo.svg"
                              width={150}
                              alt="QR Code"
                              height={150}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3 items-center bg-[#272837] shadow-inner shadow-slate-700 rounded-xl px-3.5 py-5">
                          <div className=" w-full flex items-center justify-between gap-6">
                            <p className=" text-lg font-bold uppercase">
                              2 PICKS TO WIN
                              <span className="text-primary-50 ml-1.5">
                                $500.00
                              </span>
                            </p>
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#F74418]/20 border border-[#F74418] text-xs 2xl:text-sm">
                              LOSS{" "}
                            </p>
                          </div>
                          <div className="flex flex-col max-h-44 2xl:max-h-64 mt-1 overflow-auto px-1 w-full gap-3 ">
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full pt-2">
                            <p className="  font-bold text-primary-200">ODDS</p>
                            <p className="  font-bold ">2.32</p>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <p className="  font-bold text-primary-200">
                              STAKE
                            </p>
                            <p className="  font-bold ">$10,000</p>
                          </div>
                          <div className="flex items-center justify-between w-full border-b pb-3.5 border-slate-700">
                            <p className="  font-bold text-primary-200">
                              WINNIG
                            </p>
                            <p className="  font-bold ">$26,600</p>
                          </div>
                          <div className="flex w-full px-4 py-2 items-center justify-between">
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#737897]/20 border border-[#737897] text-xs 2xl:text-sm">
                              20-03-2024
                            </p>
                            <Image
                              src="/images/logo.svg"
                              width={150}
                              alt="QR Code"
                              height={150}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3 items-center bg-[#272837] shadow-inner shadow-slate-700 rounded-xl px-3.5 py-5">
                          <div className=" w-full flex items-center justify-between gap-6">
                            <p className=" text-lg font-bold uppercase">
                              2 PICKS
                              <span className="text-primary-50 ml-1.5">
                                +$500.00
                              </span>
                            </p>
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#52FC18]/20 border border-[#52FC18] text-xs 2xl:text-sm">
                              WIN
                            </p>
                          </div>
                          <div className="flex flex-col max-h-44 2xl:max-h-56 mt-1 overflow-auto px-1 w-full gap-3 ">
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full pt-2">
                            <p className="  font-bold text-primary-200">ODDS</p>
                            <p className="  font-bold ">2.32</p>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <p className="  font-bold text-primary-200">
                              STAKE
                            </p>
                            <p className="  font-bold ">$10,000</p>
                          </div>
                          <div className="flex items-center justify-between w-full border-b pb-3.5 border-slate-700">
                            <p className="  font-bold text-primary-200">
                              WINNIG
                            </p>
                            <p className="  font-bold ">$26,600</p>
                          </div>
                          <div className="flex w-full px-4 py-2 items-center justify-between">
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#737897]/20 border border-[#737897] text-xs 2xl:text-sm">
                              20-03-2024
                            </p>
                            <Image
                              src="/images/logo.svg"
                              width={150}
                              alt="QR Code"
                              height={150}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
              <TableRow className=" border-none">
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  29523
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  BASKETBALL
                </TableCell>
                <TableCell className=" font-semibold max-w-[120px] capitalize text-xs 2xl:text-sm text-center truncate">
                  Minnesota Timeberwolves vs Daalas Mavericks
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  NBA
                </TableCell>
                <TableCell className=" font-semibold max-w-[120px] capitalize text-xs 2xl:text-sm text-center truncate">
                  POINT SPREAD DALLAS MAVERICKS +4.5
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  -110
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  1000
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm flex items-center justify-center truncate">
                  <p className=" px-2 py-1 bg-green-500/20 text-green-500 border mt-2 border-green-500 rounded-full">
                    paid
                  </p>
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center truncate">
                  $12000
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center ">
                  MAY 29, 01:36PM
                </TableCell>
                <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-sm text-center ">
                  MAY 29, 01:36PM
                </TableCell>
                <TableCell className=" font-semibold  capitalize text-xs 2xl:text-sm text-center ">
                  <Dialog>
                    <DialogTrigger className=" w-fit text-xs 2xl:text-sm text-nowrap rounded-xl inner-shadow px-4 py-3 inline-flex items-center gap-3">
                      <span className=" font-bold uppercase">Bet slip</span>{" "}
                    </DialogTrigger>
                    <DialogContent className=" bg-primary-100 gap-1 p-5 text-white border-none  md:max-w-[1200px] 2xl:min-w-[1300px] flex flex-col ">
                      <h2 className=" text-3xl font-bold mb-5">BET SLIP</h2>
                      <div className="flex items-start justify-center gap-5 2xl:mb-6 w-full">
                        <div className="flex flex-col space-y-3 items-center bg-[#272837] shadow-inner shadow-slate-700 rounded-xl px-3.5 py-5">
                          <div className=" w-full flex items-center justify-between gap-6">
                            <p className=" text-lg font-bold uppercase">
                              2 PICKS TO WIN
                              <span className="text-primary-50 ml-1.5">
                                $500.00
                              </span>
                            </p>
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#C02FF5]/20 border border-[#C02FF5] text-xs 2xl:text-sm">
                              IN PROGRESS
                            </p>
                          </div>
                          <div className="flex flex-col max-h-44 2xl:max-h-56 mt-1 overflow-auto px-1 w-full gap-3 ">
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full pt-2">
                            <p className="  font-bold text-primary-200">ODDS</p>
                            <p className="  font-bold ">2.32</p>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <p className="  font-bold text-primary-200">
                              STAKE
                            </p>
                            <p className="  font-bold ">$10,000</p>
                          </div>
                          <div className="flex items-center justify-between w-full border-b pb-3.5 border-slate-700">
                            <p className="  font-bold text-primary-200">
                              WINNIG
                            </p>
                            <p className="  font-bold ">$26,600</p>
                          </div>
                          <div className="flex w-full px-4 py-2 items-center justify-between">
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#737897]/20 border border-[#737897] text-xs 2xl:text-sm">
                              20-03-2024
                            </p>
                            <Image
                              src="/images/logo.svg"
                              width={150}
                              alt="QR Code"
                              height={150}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3 items-center bg-[#272837] shadow-inner shadow-slate-700 rounded-xl px-3.5 py-5">
                          <div className=" w-full flex items-center justify-between gap-6">
                            <p className=" text-lg font-bold uppercase">
                              2 PICKS TO WIN
                              <span className="text-primary-50 ml-1.5">
                                $500.00
                              </span>
                            </p>
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#F74418]/20 border border-[#F74418] text-xs 2xl:text-sm">
                              LOSS{" "}
                            </p>
                          </div>
                          <div className="flex flex-col max-h-44 2xl:max-h-64 mt-1 overflow-auto px-1 w-full gap-3 ">
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full pt-2">
                            <p className="  font-bold text-primary-200">ODDS</p>
                            <p className="  font-bold ">2.32</p>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <p className="  font-bold text-primary-200">
                              STAKE
                            </p>
                            <p className="  font-bold ">$10,000</p>
                          </div>
                          <div className="flex items-center justify-between w-full border-b pb-3.5 border-slate-700">
                            <p className="  font-bold text-primary-200">
                              WINNIG
                            </p>
                            <p className="  font-bold ">$26,600</p>
                          </div>
                          <div className="flex w-full px-4 py-2 items-center justify-between">
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#737897]/20 border border-[#737897] text-xs 2xl:text-sm">
                              20-03-2024
                            </p>
                            <Image
                              src="/images/logo.svg"
                              width={150}
                              alt="QR Code"
                              height={150}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3 items-center bg-[#272837] shadow-inner shadow-slate-700 rounded-xl px-3.5 py-5">
                          <div className=" w-full flex items-center justify-between gap-6">
                            <p className=" text-lg font-bold uppercase">
                              2 PICKS
                              <span className="text-primary-50 ml-1.5">
                                +$500.00
                              </span>
                            </p>
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#52FC18]/20 border border-[#52FC18] text-xs 2xl:text-sm">
                              WIN
                            </p>
                          </div>
                          <div className="flex flex-col max-h-44 2xl:max-h-56 mt-1 overflow-auto px-1 w-full gap-3 ">
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                            <div className="bg-[#333547]  shadow-inner w-full shadow-gray-700 p-3 rounded-lg ">
                              <p className=" text-sm mb-2">
                                Baltimore Ravens{" "}
                                <span className=" font-thin">VS</span> Kansas
                                City Chiefs
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/icons/kansas.png"
                                    width={20}
                                    alt="Kansas City Chiefs"
                                    height={20}
                                  />
                                  <p className="text-sm">Kansas City Chiefs</p>
                                </div>
                                <p className="font-bold">2.23</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full pt-2">
                            <p className="  font-bold text-primary-200">ODDS</p>
                            <p className="  font-bold ">2.32</p>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <p className="  font-bold text-primary-200">
                              STAKE
                            </p>
                            <p className="  font-bold ">$10,000</p>
                          </div>
                          <div className="flex items-center justify-between w-full border-b pb-3.5 border-slate-700">
                            <p className="  font-bold text-primary-200">
                              WINNIG
                            </p>
                            <p className="  font-bold ">$26,600</p>
                          </div>
                          <div className="flex w-full px-4 py-2 items-center justify-between">
                            <p className="text-white font-bold px-2 py-1.5 rounded-lg bg-[#737897]/20 border border-[#737897] text-xs 2xl:text-sm">
                              20-03-2024
                            </p>
                            <Image
                              src="/images/logo.svg"
                              width={150}
                              alt="QR Code"
                              height={150}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex items-center justify-between p-5 border-t border-gray-700">
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
      </DialogContent>
    </Dialog>
  );
};

export default BetModal;
