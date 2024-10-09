"use client";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { accountStore } from "../store/account";

const layout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter()
  const { status, data: session } = useSession();
  console.log("this is the session : ", session, status);

  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);
  
  // Account store
  const updateAccount = accountStore((state) => state.setAccount);
  
  // User Account
  const { data: accounts, isPending } = useGetAccounts();

  useEffect(()=>{
    if(accounts && !isPending){
      updateAccount(accounts[0]);
    }
  }, [accounts, isPending])
  
  return (
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
        {status === 'loading' && <p>isLoading...</p>}
      </main>
  );
}

export default layout;
