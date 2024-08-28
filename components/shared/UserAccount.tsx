import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuChevronsUpDown } from "react-icons/lu";

import Image from "next/image";

const UserAccount = () => {
  return (
    <div className=" w-full md:w-fit py-4  md:p-4">
      <DropdownMenu>
        <DropdownMenuTrigger className=" data-[state=open]:border-2  data-[state=open]:shadow data-[state=open]:shadow-primary-50/30 data-[state=open]:border-primary-50/50   bg-[#272837]  font-bold   justify-center text-nowrap w-full md:w-fit  text-xs md:text-sm px-1.5 md:px-4 py-2  rounded-lg inline-flex items-center gap-2">
          <span className=" text-white text-xs 2xl:text-base border-r border-gray-600 pr-1.5 md:pr-4">
            $1000
          </span>
          <span className=" text-[#848BAC] px-1 md:px-2 text-xs 2xl:text-base">
            ACCOUNT
          </span>
          <span className=" text-white text-xs 2xl:text-base border-r border-gray-600 pr-1.5 md:pr-4">
            #239842389
          </span>
          <span className=" text-[#C02FF5]/70 border inline-flex items-center gap-x-1 md:gap-x-1.5 border-[#C02FF5]/80 text-xs 2xl:text-base  p-1 px-1 md:px-2  rounded-sm bg-[#C02FF5]/10">
            <Image
              src="/icons/account-challenge.svg"
              alt="Arrow Icon"
              width={13}
              height={13}
            />
            CHALLENGE
          </span>
          <LuChevronsUpDown className=" md:text-lg text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="   border-none shadow-gray-600   bg-[#181926] text-white   mt-1  p-1 rounded-lg shadow-base">
          <DropdownMenuItem className="flex py-0 items-center gap-14 md:gap-28 justify-between ">
            <p className="  inline-flex items-center font-bold">
              $1000 <span className="text-3xl flex  mb-4 mx-1.5">.</span>
              #239842389
            </p>
            <span className=" text-[#C02FF5]/70 border font-semibold inline-flex items-center gap-x-1.5 border-[#C02FF5]/80 text-xs 2xl:text-base  p-1 px-2  rounded-sm bg-[#C02FF5]/10">
              <Image
                src="/icons/account-challenge.svg"
                alt="Arrow Icon"
                width={13}
                height={13}
              />
              CHALLENGE
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex py-0 items-center gap-14 md:gap-28 justify-between ">
            <p className="  inline-flex items-center font-bold">
              $1000 <span className="text-3xl flex  mb-4 mx-1.5">.</span>
              #239842389
            </p>
            <span className=" text-[#53FC18]/70 border font-semibold inline-flex items-center gap-x-1.5 border-[#53FC18]/80 text-xs 2xl:text-base  p-1 px-2  rounded-sm bg-[#53FC18]/10">
              <Image
                src="/icons/account-funded.svg"
                alt="Arrow Icon"
                width={13}
                height={13}
              />
              FUNDED
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex py-0 items-center gap-14 md:gap-28 justify-between ">
            <p className="  inline-flex items-center font-bold">
              $1000 <span className="text-3xl flex  mb-4 mx-1.5">.</span>
              #239842389
            </p>
            <span className=" text-[#F74418]/70 border font-semibold inline-flex items-center gap-x-1.5 border-[#F74418]/80 text-xs 2xl:text-base  p-1 px-2  rounded-sm bg-[#F74418]/10">
              <Image
                src="/icons/account-breached.svg"
                alt="Arrow Icon"
                width={13}
                height={13}
              />
              BREACHED
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAccount;
