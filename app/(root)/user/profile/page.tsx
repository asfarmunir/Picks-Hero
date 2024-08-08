"use client";
import Navbar from "@/components/shared/Navbar";
import { tabs } from "@/lib/constants";
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
import { useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

const page = () => {
  const [tab, setTab] = useState<string>("profile");

  const changeTab = (tab: string) => {
    setTab(tab);
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
          <h1 className=" ml-4  text-white inline-flex items-center gap-2 font-thin 2xl:text-lg">
            <Image
              src="/icons/profile-green.svg"
              alt="Logo"
              width={20}
              height={20}
            />
            Profile
          </h1>
          <Navbar />
        </div>
      </div>
      <div className=" w-full  flex  text-white mt-16 md:mt-9 p-5 md:p-8 pb-24 max-h-full overflow-auto">
        <div className=" w-full  md:w-[70%] h-full shadow-inner shadow-gray-800 flex flex-col gap-4 bg-[#181926] p-4 md:p-6 rounded-xl">
          <div className=" w-full items-center flex justify-between">
            <h2 className=" text-xl font-bold text-white">PROFILE</h2>
            <button className=" text-white uppercase text-sm bg-[#333547]  px-5 py-2 rounded-lg inline-flex items-center gap-3">
              <Image
                src="/icons/logout.png"
                alt="Edit"
                width={16}
                height={16}
              />
              Sign Out
            </button>
          </div>
          {/* T A B S  */}
          <div className="flex mt-4 items-center justify-evenly md:justify-start flex-wrap gap-2 mb-3">
            {tabs.map((curr, index) => (
              <button
                key={index}
                className={`border  
             px-5 text-xs 2xl:text-lg py-2 flex-grow md:flex-grow-0 rounded-full ${
               tab === curr.name
                 ? "border-[#52FC18] bg-[#1A5B0B]"
                 : " border-gray-700 text-[#848BAC] border-2"
             } font-semibold uppercase`}
                onClick={() => changeTab(curr.name)}
              >
                {curr.name}
              </button>
            ))}
          </div>
          {tab === "profile" && <ProfileSection />}
          {tab === "accounts" && <AccountsSection />}
          {tab === "payouts" && <PayoutsSection />}
          {tab === "certificates" && <CertificaeSection />}
        </div>
        <div className=" hidden md:block md:w-[30%]   ">
          <Image
            src="/images/profile-hero.png"
            alt="Ads"
            width={300}
            priority
            className=" rounded-lg object-contain object-center w-full h-full "
            height={250}
          />
        </div>
      </div>
    </>
  );
};

export default page;

const ProfileSection = () => {
  return (
    <>
      <div className=" p-4 shadow-inner shadow-gray-700 rounded-xl flex items-start justify-between bg-[#272837]">
        <div className="flex gap-3 items-center">
          <Image src="/images/avatar.png" alt="User" width={60} height={60} />
          <div className="flex flex-col">
            <p className=" text-sm font-bold text-[#848BAC] uppercase">
              Username
            </p>
            <h3 className="font-bold text-xl">Luke Kilos</h3>
          </div>
        </div>
        <button className=" inline-flex uppercase text-xs text-[#52FC18] items-center gap-2">
          <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
          Edit Avatar
        </button>
      </div>
      <div className=" p-4 shadow-inner shadow-gray-700 rounded-xl flex items-start justify-between bg-[#272837]">
        <div className="flex gap-3 items-center">
          <Image src="/images/plan.png" alt="User" width={50} height={50} />
          <div className="flex flex-col">
            <p className=" text-sm font-bold text-[#848BAC] uppercase">
              PROFILE LEVEL
            </p>
            <h3 className="font-bold text-xl">SILVER</h3>
          </div>
        </div>
      </div>
      <div className=" mb-8 p-4 shadow-inner gap-2 bg-[#52FC18]/10 text-[#52FC18] shadow-gray-700 rounded-xl flex flex-col  ">
        <h2 className="  text-xl 2xl:text-2xl font-bold">
          Upgrade your PROFILE Level
        </h2>
        <p className=" text-sm font-thin text-green-600">
          Upgrade your PROFILE Level and get exclusive access to discord roles,
          events, prizes and discounts.
        </p>
        <div className="flex items-center justify-between mt-4">
          <h4 className="2xl:text-lg font-bold">PROGRESS TO NEXT LEVEL</h4>
          <h4 className="2xl:text-lg font-bold">33/100 PICKS WON</h4>
        </div>
        <div className=" w-full h-5 bg-[#393C53] rounded-md">
          <div className="bg-[#00B544] shadow-inner rounded-md shadow-gray-500 w-[33%] h-full"></div>
        </div>
      </div>
    </>
  );
};

const AccountsSection = () => {
  return (
    <div className=" w-full space-y-5 bg-primary-100 py-6 px-2 md:p-3  rounded-2xl 2xl:p-5 mb-8">
      <div className=" w-full flex flex-col gap-3 md:flex-row items-center  justify-between">
        <h2 className=" 2xl:text-xl font-bold"> OVERVIEW</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-fit">
          <button className=" bg-[#272837]   justify-center  w-full md:w-fit text-xs 2xl:text-base px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
            <Image
              src="/icons/check.png"
              alt="Arrow Icon"
              width={18}
              height={18}
            />
            SHOW BREACHED
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className=" bg-[#272837]    justify-center w-full md:w-fit  text-xs 2xl:text-base px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
              <Image
                src="/icons/sort.png"
                alt="Arrow Icon"
                width={18}
                height={18}
              />
              SORT
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg text-xs 2xl:text-base">
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
          <button className="  shadow-green-400    justify-center w-full md:w-fit inner-shadow text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
            <Image
              src="/icons/add.png"
              alt="Arrow Icon"
              width={18}
              height={18}
            />
            ADD ACCOUNT
          </button>
        </div>
      </div>
      <div className="flex flex-col  items-center gap-4">
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
            <p className=" text-xs md:text-sm text-[#AFB2CA]  mb-3 mt-4 md:mt-1 2xl:text-lg ">
              ACCOUNT BALANCE
            </p>
            <p className=" text-white mb-3 mt-4 text-xs  md:mt-0 2xl:text-lg font-semibold">
              $19,343.39
            </p>
          </div>
          <div className=" w-full flex items-center justify-between">
            <p className=" text-[#AFB2CA] text-xs md:text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
              ACCOUNT NUMBER
            </p>
            <p className=" text-white mb-3 mt-4 text-xs md:text-sm md:mt-0 2xl:text-lg font-semibold">
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
            <p className=" text-[#AFB2CA] text-xs md:text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
              ACCOUNT BALANCE
            </p>
            <p className=" text-white text-xs md:text-sm mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
              $19,343.39
            </p>
          </div>
          <div className=" w-full flex items-center justify-between">
            <p className=" text-[#AFB2CA] text-xs md:text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
              ACCOUNT NUMBER
            </p>
            <p className=" text-white text-xs md:text-sm mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
              #PH8823232-22
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center gap-4">
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
    </div>
  );
};

const PayoutsSection = () => {
  return (
    <div className=" w-full space-y-5 bg-primary-100 py-6  md:p-3  rounded-2xl 2xl:p-5 mb-8">
      <div className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative min-h-32 2xl:min-h-44 rounded-2xl w-full  flex flex-col gap-1 ">
        <p className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          Total Payout Amount
        </p>
        <div className=" flex items-center gap-4">
          <Image
            src="/icons/payout.svg"
            alt="Arrow Icon"
            width={45}
            height={45}
          />
          <p className="   md:mt-0 text-3xl  2xl:text-4xl font-semibold">
            $45,865.55
          </p>
        </div>
      </div>
      <div className=" w-full border border-gray-700 rounded-xl  flex flex-col">
        <div className="flex items-center justify-between w-full p-6 ">
          <h3 className=" font-bold">PAYOUT HISTORY</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className=" bg-[#272837] shadow-inner shadow-gray-700   justify-center  md:w-fit  text-xs 2xl:text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
              <Image
                src="/icons/filter.svg"
                alt="Arrow Icon"
                width={13}
                height={13}
              />
              FILTER
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg shadow-sm">
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
              <TableHead className="uppercase  font-bold text-center">
                Date
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                INVOICE NUMBER
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                invoice
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                STATUS
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className=" border-none">
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                07 jul 2024 at 34:23pm
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                123456789123456789
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                €10.00
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base flex items-center justify-center truncate">
                <p className=" px-2 py-1 bg-green-500/20 text-green-500 border border-green-500 rounded-full">
                  paid
                </p>
              </TableCell>
              <TableCell className=" font-semibold max-w-[120px]  capitalize text-xs 2xl:text-base  justify-center ">
                <p className="flex items-center gap-1 text-xs  text-green-400 font-semibold ">
                  <Image
                    src="/icons/download.png"
                    alt="Coin Icon"
                    width={14}
                    height={14}
                  />
                  <span className=" ">DOWNLOAD</span>
                </p>
              </TableCell>
            </TableRow>
            <TableRow className=" border-none">
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                07 jul 2024 at 34:23pm
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                123456789123456789
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base text-center truncate">
                €10.00
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize text-xs 2xl:text-base flex items-center justify-center truncate">
                <p className=" px-2 py-1 bg-red-500/20 text-red-500 border border-red-500 rounded-full">
                  rejected
                </p>
              </TableCell>
              <TableCell className=" font-semibold max-w-[120px]  capitalize text-xs 2xl:text-base  justify-center ">
                <p className="flex items-center gap-1 text-xs  text-green-400 font-semibold ">
                  <Image
                    src="/icons/download.png"
                    alt="Coin Icon"
                    width={14}
                    height={14}
                  />
                  <span className=" ">DOWNLOAD</span>
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
  );
};

const CertificaeSection = () => {
  return (
    <div className=" w-full flex flex-col space-y-5  py-6  md:p-3  rounded-2xl 2xl:p-5  mb-8 ">
      <div className=" bg-[#272837] shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center  overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 ">
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/funded_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            FUNDED
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          You have no certificates to display
        </p>
        <Dialog>
          <DialogTrigger className=" flex items-center px-4 py-1.5  shadow-inner shadow-gray-600 rounded-xl gap-1 text-white font-bold 2xl:text-lg ">
            <Image
              src="/icons/certificate.svg"
              alt="Arrow Icon"
              width={20}
              height={20}
            />
            VIEW 3 CERTIFICATES
          </DialogTrigger>
          <DialogContent className=" bg-primary-100 text-white p-8 border-none">
            <DialogHeader>
              <DialogTitle className=" text-xl font-bold mb-4">
                FUNDED CERTIFICATES
              </DialogTitle>
              <div className="flex flex-col gap-2 w-full">
                <div className=" p-4 bg-[#272837] rounded-xl py-8 shadow-inner shadow-gray-700 flex items-center justify-between">
                  <h2 className=" text-lg font-bold uppercase">
                    CERTIFICATE TITLE
                  </h2>
                  <div className="inline-flex items-center gap-2">
                    <Image
                      src="/icons/download.png"
                      alt="Arrow Icon"
                      width={15}
                      height={15}
                    />
                    <p className="text-xs text-[#52FC18] font-bold">DOWNLOAD</p>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" bg-[#272837] shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 ">
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/payout_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            PAYOUT
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          You have no certificates to display
        </p>
      </div>
      <div className=" bg-[#272837] shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 ">
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/lifetime_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            LIFETIME PAYOUT
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          You have no certificates to display
        </p>
      </div>
      <div className=" bg-[#272837]  shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 ">
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/funded_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            PROFILE LEVEL
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          You have no certificates to display
        </p>
      </div>
    </div>
  );
};
