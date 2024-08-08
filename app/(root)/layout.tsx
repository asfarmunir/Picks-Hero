import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`h-screen flex bg-primary`}>
      <Sidebar />

      <main className="flex relative flex-col  items-start overflow-hidden  max-h-screen  w-full">
        <section className="  h-full w-full ">{children}</section>
      </main>
    </main>
  );
};

export default layout;
