"use client";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { accountStore } from "../store/account";
import { useGetUser } from "../hooks/useGetUser";
import { userStore } from "../store/user";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status, data: session } = useSession();

  // User Details
  const { data: user, isPending: loadingUser } = useGetUser();
  const updateUser = userStore((state) => state.setUser);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(()=>{
    if (!loadingUser && user) {
      updateUser(user.user);
      console.log(user)
    }
  }, [loadingUser, user, updateUser])

  // Account store
  const updateAccount = accountStore((state) => state.setAccount);

  // User Account
  const { data: accounts, isPending } = useGetAccounts();
  const [hasAccount, setHasAccount] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (accounts && !isPending) {
      updateAccount(accounts[0]);

    }
    if (!isPending && accounts.length === 0 && !(pathname === '/user/profile' || pathname === '/settings') ) {
      setHasAccount(false);
    }
  }, [accounts, isPending, pathname]);
  
  // Dashboard Locking
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
            <div className="flex gap-2">
              <span className="text-sm text-white text-opacity-40">OR{" "}</span>
              <button className="text-primary-50 underline text-sm focus:outline-none text-left"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
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
