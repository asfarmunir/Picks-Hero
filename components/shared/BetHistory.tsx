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

import { useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import Image from "next/image";
const BetHistory = () => {
  return (
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
              <p className=" px-2 py-1 bg-green-500/20 text-green-500 border border-green-500 rounded-full">
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
              <p className=" px-2 py-1 bg-green-500/20 text-green-500 border border-green-500 rounded-full">
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
              <p className=" px-2 py-1 bg-green-500/20 text-green-500 border border-green-500 rounded-full">
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
  );
};

export default BetHistory;
