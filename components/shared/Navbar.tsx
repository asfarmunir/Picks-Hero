// "use client";
import { useState, useEffect } from "react";
import { PiBell } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1200);
  // }, []);
  return (
    <div className="  bg-primary  items-center flex justify-between px-3 md:px-8 py-3 2xl:py-4 ">
      <div className="inline-flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <PiBell className=" border-t border-gray-600 bg-gray-900 hover:cursor-pointer rounded-md p-1.5 px-2 text-white text-4xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 z-50 text-white bg-[#272837]  mr-36 border-none py-5 mt-1   rounded-xl  shadow-inner shadow-gray-700">
            <div className=" w-full items-center flex justify-between border-b  border-gray-700  pb-4 mb-2">
              <h3 className=" text-lg font-bold px-3.5">Notifications</h3>
              <button className=" text-sm inline-flex gap-1 items-center font-bold text-primary-50 px-3.5">
                <Image
                  src="/icons/mark-as-read.svg"
                  alt="Mark All"
                  width={16}
                  height={16}
                />
                Mark read
              </button>
            </div>
            <div className="flex hover:bg-[#333547]/20 flex-col items-center min-h-40 justify-center my-4 py-3 px-3.5">
              <Image
                src="/images/notification.svg"
                alt="Client"
                className=" mx-auto"
                width={50}
                height={50}
              />
              <p className=" text-sm text-[#737897] font-light ">
                You’ll get updates on recent activity here.
              </p>
            </div>

            <div className="flex hover:bg-[#333547]/20 items-center justify-start my-4 py-3 px-3.5">
              <Image
                src="/icons/marked.png"
                alt="Client"
                width={50}
                height={50}
              />
              <div className="flex flex-col ml-3">
                <p className="font-bold">THIS IS THE TITLE</p>
                <span className=" text-sm text-slate-400/60">
                  Yesterday at 12:31 PM
                </span>
              </div>
            </div>
            <div className="flex hover:bg-[#333547]/20 items-center justify-start my-4 py-3 px-3.5">
              <Image
                src="/icons/marked.png"
                alt="Client"
                width={50}
                height={50}
              />
              <div className="flex flex-col ml-3">
                <p className="font-bold">THIS IS THE TITLE</p>
                <span className=" text-sm text-slate-400/60">
                  Yesterday at 12:31 PM
                </span>
              </div>
            </div>
            <div className="flex hover:bg-[#333547]/20 items-center justify-start my-4 py-3 px-3.5">
              <Image
                src="/icons/marked.png"
                alt="Client"
                width={50}
                height={50}
              />
              <div className="flex flex-col ml-3">
                <p className="font-bold">THIS IS THE TITLE</p>
                <span className=" text-sm text-slate-400/60">
                  Yesterday at 12:31 PM
                </span>
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
