import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  w-full flex-col  justify-start  bg-primary min-h-screen ">
      <div className=" w-full pt-5 px-8">
        <Image
          priority
          src="/images/logo.svg"
          alt="logo"
          width={140}
          height={140}
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
