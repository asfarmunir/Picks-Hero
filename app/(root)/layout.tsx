"use client";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { accountStore } from "../store/account";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  console.log("this is the session : ", session, status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Account store
  const updateAccount = accountStore((state) => state.setAccount);

  // User Account
  const { data: accounts, isPending } = useGetAccounts();

  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    if (accounts && !isPending) {
      updateAccount(accounts[0]);
    }
    if (accounts && accounts.length === 1) {
      setHasAccount(true);
    }
  }, [accounts, isPending]);

  useEffect(() => {
    if (!hasAccount) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      {!hasAccount && (
        <Dialog open>
          <DialogTitle hidden>Create Account</DialogTitle>
          <DialogOverlay className="backdrop-blur-sm bg-black/10" />
          <DialogContent className="text-white border-none p-8 pb-48 md:pb-12 overflow-hidden min-h-48 2xl:min-h-56 rounded-2xl w-[95%] max-w-screen-xl bg-primary-100 flex flex-col gap-3 [&_button:has(svg)]:hidden">
            <div className="flex flex-wrap justify-start items-end sm:flex-row h-full sm:items-center gap-2">
              <h1 className="text-3xl 2xl:text-4xl font-bold text-pretty">
                BET SPORTS WITH OUR
              </h1>
              <Image
                src="/images/money.png"
                alt="Football Icon"
                width={110}
                className="mr-12 sm:mr-0 sm:mt-0 2xl:w-[130px] 2xl:ml-1"
                height={110}
              />
            </div>
            <p className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
              Lower risk, higher rewards, bet with our capital
            </p>
            <Link
              href={"/create-account"}
              className="text-white w-fit text-sm rounded-xl inner-shadow px-4 py-3 inline-flex items-center gap-3 hover:opacity-95"
            >
              Create Account
            </Link>
            <Image
              src="/images/hero.png"
              alt="Hero Image"
              width={700}
              height={700}
              className=" absolute bottom-0 right-0  md:-right-20 md:-bottom-28 2xl:w-[840px] 2xl:-bottom-36 -z-10"
            />
          </DialogContent>
        </Dialog>
      )}
      <main className={`h-screen flex bg-primary`}>
        {status === "authenticated" && (
          <>
            <Sidebar />

            <main className="flex relative flex-col  items-start overflow-hidden  max-h-screen  w-full">
              <MobileNav />
              <section className="  h-full w-full ">{children}</section>
            </main>
          </>
        )}
        {status === "loading" && <p>isLoading...</p>}
      </main>
    </>
  );
};

export default layout;
