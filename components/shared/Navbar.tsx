import React from "react";
import { PiBell } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="  bg-primary  items-center flex justify-between px-3 md:px-8 py-3 2xl:py-4 ">
      <div className="inline-flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <PiBell className=" border-t border-gray-600 bg-gray-900 hover:cursor-pointer rounded-md p-1.5 px-2 text-white text-4xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 mr-24 mt-1 p-6 py-4 rounded-none shadow-sm">
            <div className=" w-full items-center flex justify-between mb-2">
              <h3 className=" text-lg font-sans">Notifications</h3>
              <button className=" text-blue-400 font-thin text-sm">
                Mark all as read
              </button>
            </div>
            <DropdownMenuSeparator />
            <div className="flex items-start justify-start my-4">
              <Image
                src="/images/client1.svg"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col ml-3">
                <p className="">
                  <strong className=" mr-1 ">Bryce Caton</strong>
                  has completed chest workout and said “Great workout!”
                </p>
                <span className=" text-sm text-slate-400/60">3hrs ago</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="flex items-start justify-start my-4">
              <Image
                src="/images/client1.svg"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col ml-3">
                <p className="">
                  <strong className=" mr-1 ">Bryce Caton</strong>
                  has completed chest workout and said “Great workout!”
                </p>
                <span className=" text-sm text-slate-400/60">3hrs ago</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="flex items-start justify-start my-4">
              <Image
                src="/images/client1.svg"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col ml-3">
                <p className="">
                  <strong className=" mr-1 ">Bryce Caton</strong>
                  has completed chest workout and said “Great workout!”
                </p>
                <span className=" text-sm text-slate-400/60">3hrs ago</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="flex items-start justify-start my-4">
              <Image
                src="/images/client1.svg"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col ml-3">
                <p className="">
                  <strong className=" mr-1 ">Bryce Caton</strong>
                  has completed chest workout and said “Great workout!”
                </p>
                <span className=" text-sm text-slate-400/60">3hrs ago</span>
              </div>
            </div>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href={"/user/profile"}
          className=" border-t border-gray-600 bg-gray-900 hover:cursor-pointer rounded-md p-1.5 px-2 text-white text-4xl"
        >
          <Image
            src="/icons/profile.svg"
            alt="User Avatar"
            width={20}
            height={20}
            className="rounded-full hover:cursor-pointer"
          />
        </Link>
        <button className=" border-t border-gray-600 bg-gray-900 hover:cursor-pointer rounded-md p-1.5 px-2 text-white text-4xl">
          <Image
            src="/icons/setting.svg"
            alt="User Avatar"
            width={20}
            height={20}
            className="rounded-full hover:cursor-pointer"
          />
        </button>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src="/images/avatar.svg"
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full hover:cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" mr-12 mt-1 p-5 py-6 gap-3 bg-white rounded-none shadow w-72 flex items-center justify-between">
            <Image
              src="/images/avatar.svg"
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col mr-3">
              <p className=" font-semibold ">Lex Caton</p>
              <span className=" text-sm text-slate-400">lexaCatonOwner</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <button className="">
                <IoSettingsOutline className=" text-2xl text-primary-50" />
              </button>
              <button className="">
                <TbLogout className=" text-2xl text-red-500" />
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default Navbar;
