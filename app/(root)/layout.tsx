import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`h-screen flex bg-primary`}>
      <Sidebar />

      <main className="flex relative flex-col  items-start overflow  max-h-screen  w-full">
        <div
          className=" sticky
        top-0
        z-50
        w-full
        "
        >
          <Navbar />
        </div>
        <section className=" mt-16 pt-3 h-full w-full ">{children}</section>
      </main>
    </main>
  );
};

export default layout;
