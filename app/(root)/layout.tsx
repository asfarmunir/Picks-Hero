"use client";
import MobileNav from "@/components/shared/MobileNav";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const layout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter()
  const { status, data: session } = useSession();
  console.log("this is the session : ", session, status);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

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
