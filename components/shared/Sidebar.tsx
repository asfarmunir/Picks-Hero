"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navlinks = [
  {
    title: "Home",
    icons: [
      {
        src: "/icons/home.svg",
      },
      {
        src: "/icons/home-off.svg",
      },
    ],
    link: "/",
  },
  {
    title: "Dashboard",
    icons: [
      {
        src: "/icons/dashboard.svg",
      },
      {
        src: "/icons/dashboard-off.svg",
      },
    ],
    link: "/dashboard",
  },
  {
    title: "pick",
    icons: [
      {
        src: "/icons/pick.svg",
      },
      {
        src: "/icons/pick-off.svg",
      },
    ],
    link: "/pick",
  },
  {
    title: "community",
    icons: [
      {
        src: "/icons/community.svg",
      },
      {
        src: "/icons/community-off.svg",
      },
    ],
    link: "/community",
  },
  {
    title: "refer & earn",
    icons: [
      {
        src: "/icons/refer.svg",
      },
      {
        src: "/icons/refer-off.svg",
      },
    ],
    link: "/refer",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <div className=" relative bg-primary border-r border-gray-800 h-full w-[22%] 2xl:w-[24%] min-h-svh hidden lg:flex gap-7 2xl:gap-10 flex-col p-4">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={170}
          height={170}
          priority
        />
        <div className="flex items-center gap-3">
          <Image
            src="/images/hello.png"
            alt="Client"
            width={46}
            height={46}
            className=" 2xl:w-14 2xl:h-14 "
          />
          <div className="flex flex-col">
            <p className="text-[#848BAC] font-semibold text-xs 2xl:text-base  mb-1 2xl:mb-2">
              Welcome Back!
            </p>
            <h3 className=" text-lg 2xl:text-xl font-bold text-white">
              Adrew Smith
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 ">
          {navlinks.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className={`inline-flex font-bold uppercase text-sm  2xl:text-lg 
        ${
          pathname === link.link
            ? "text-white inner-left-shadow p-3 2xl:p-4 bg-[#181926] rounded-2xl "
            : "text-[#848BAC] px-3 2xl:px-4 p-2"
        }
        
        items-center gap-2`}
            >
              <Image
                src={
                  pathname === link.link ? link.icons[0].src : link.icons[1].src
                }
                alt="Lex Lynne Fitness"
                width={16}
                className={` 2xl:w-[20px] `}
                height={16}
                priority
              />
              {link.title}
            </Link>
          ))}
        </div>
        <div className=" absolute bottom-5 flex-col flex">
          <Link
            href={"/help"}
            className={`inline-flex font-bold text-sm  2xl:text-lg 
            text-[#848BAC] px-3 2xl:px-4 p-2
        items-center gap-2`}
          >
            <Image
              src={"/icons/help.svg"}
              alt="Lex Lynne Fitness"
              width={16}
              className={` 2xl:w-[20px] `}
              height={16}
              priority
            />
            HELP
          </Link>
          <button
            className={`inline-flex uppercase font-bold text-sm  2xl:text-lg 
            text-[#848BAC] px-3 2xl:px-4 p-2
        items-center gap-2`}
          >
            <Image
              src={"/icons/collapse.svg"}
              alt="Lex Lynne Fitness"
              width={16}
              className={` 2xl:w-[20px] `}
              height={16}
              priority
            />
            collapse
          </button>
        </div>
      </div>
      {/* Movbile Sidebar */}

      {/* Mobile Sidebar end */}
    </>
  );
};

export default Sidebar;
