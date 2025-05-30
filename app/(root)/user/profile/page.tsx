"use client";
import Navbar from "@/components/shared/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { profileLevels, tabs } from "@/lib/constants";
import Image from "next/image";

import { useGetAccounts } from "@/app/hooks/useGetAccounts";
import { useGetUser } from "@/app/hooks/useGetUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { accountStore } from "@/app/store/account";
import { getOriginalAccountValue } from "@/lib/utils";
import PayoutModal from "./payout-modal";
import { signOut, useSession } from "next-auth/react";
import { CertificateType, User } from "@prisma/client";
import FundedPayoutRequestsTable from "./payout-requests";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";
import { useSendCertificate } from "@/app/hooks/useSendCertificate";
import toast from "react-hot-toast";
import { usePostAvatar } from "@/app/hooks/usePostAvatar";
import { useGetFundedPayout } from "@/app/hooks/useGetFundedPayout";

interface Account {
  id: string;
  userId: string;
  accountType: "TWO_STEP" | "THREE_STEP"; // If there are other types, you can add them here
  accountSize: string; // If there are other sizes, you can add them here
  status: "CHALLENGE" | "FUNDED" | "BREACHED"; // Add other possible statuses if needed
  balance: number;
  accountNumber: string;
  paymentMethod: string | null;
  createdAt: string; // Alternatively, use `Date` if parsing to Date object is needed
  updatedAt: string; // Same as above, use `Date` if necessary
}

const ACCOUNT_STATUS_ICON_DICT = {
  CHALLENGE: "/icons/challenge.svg",
  FUNDED: "/icons/fund.svg",
  BREACHED: "/icons/breach.svg",
};

type ProfileLevel =
  | "NEWBIE"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "HERO";

const page = () => {
  // Search Params
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";

  // Tabs
  const [tab, setTab] = useState<string>(defaultTab);
  const changeTab = (tab: string) => {
    setTab(tab);
  };

  // GET ACCOUNTS
  const { data: userAccounts, isPending } = useGetAccounts();

  return (
    <>
      <div
        className=" hidden md:block sticky 
        top-0
        z-50
        w-full
        "
      >
        <div className=" w-[99%] bg-primary justify-between flex items-center absolute">
          <h1 className=" ml-4  text-white inline-flex items-center gap-2 font-thin 2xl:text-lg">
            <Image
              src="/icons/profile-green.svg"
              alt="Logo"
              width={20}
              height={20}
            />
            Profile
          </h1>
          <Navbar />
        </div>
      </div>
      <div className=" w-full  flex gap-4  text-white mt-1 md:mt-9 p-5 md:p-8 pb-24 max-h-full overflow-auto">
        <div className=" w-full  md:w-[70%] h-full shadow-inner shadow-gray-800 flex flex-col gap-4 bg-[#181926] p-4 md:p-6 rounded-xl">
          <div className=" w-full items-center flex justify-between">
            <h2 className=" text-xl font-bold text-white">PROFILE</h2>
            <button
              className=" text-white uppercase text-sm bg-[#333547]  px-5 py-2 rounded-lg inline-flex items-center gap-3"
              onClick={() => signOut()}
            >
              <Image
                src="/icons/logout.png"
                alt="Edit"
                width={16}
                height={16}
              />
              Sign Out
            </button>
          </div>
          {/* T A B S  */}
          <div className="flex mt-4 items-center justify-evenly md:justify-start flex-wrap gap-2 mb-3">
            {tabs.map((curr, index) => (
              <button
                key={index}
                className={`border  
             px-5 text-xs 2xl:text-lg py-2 flex-grow md:flex-grow-0 rounded-full ${tab === curr.name
                    ? "border-[#52FC18] bg-[#1A5B0B]"
                    : " border-gray-700 text-[#848BAC] border-2"
                  } font-semibold uppercase`}
                onClick={() => changeTab(curr.name)}
              >
                {curr.name}
              </button>
            ))}
          </div>
          {tab === "profile" && <ProfileSection />}
          {tab === "accounts" && <AccountsSection accounts={userAccounts} />}
          {tab === "payouts" && <PayoutsSection />}
          {tab === "certificates" && <CertificaeSection />}
        </div>
        <div className=" hidden md:block md:w-[30%]  ">
          <Image
            src="/images/profile-hero.png"
            alt="Ads"
            width={470}
            priority
            height={450}
            className=" rounded-lg  
             h-full w-full
            
              "
          />
        </div>
      </div>
    </>
  );
};

export default page;

const ProfileSection = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const { data, isPending, refetch } = useGetUser();

  const handleImageUpload = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
    }
  };

  const { mutate: postAvatar, isPending: uploading } = usePostAvatar({
    onSuccess: (data) => {
      toast.success("Avatar uploaded successfully");
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to upload avatar");
    },
  });

  useEffect(() => {
    if (image) {
      postAvatar(image);
    }
  }, [image]);

  if (isPending) {
    return (
      <div className=" p-4 shadow-inner shadow-gray-700 rounded-xl flex items-center justify-center bg-[#272837]">
        <LoaderCircle className="animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className=" p-4 shadow-inner shadow-gray-700 rounded-xl flex items-start justify-between bg-[#272837]">
        <div className="flex gap-3 items-center">
          {data?.user?.avatar ? (
            <Image
              src={data.user.avatar}
              alt="User"
              width={50}
              height={50}
              className="rounded-full object-cover !w-12 !h-12"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-700 border border-gray-500 flex justify-center items-center text-xl text-gray-400">
              {`${data.user?.firstName[0]}${data.user?.lastName[0]}`}
            </div>
          )}
          <div className="flex flex-col">
            <p className=" text-sm font-bold text-[#848BAC] uppercase">
              Username
            </p>
            <h3 className="font-bold text-xl">
              {`${data.user?.firstName} ${data.user?.lastName}`}
            </h3>
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={imageRef}
          accept="image/*"
          onChange={handleImageChange}
        />
        <button
          disabled={uploading}
          className=" inline-flex uppercase text-xs text-[#52FC18] items-center gap-2 disabled:opacity-20"
          onClick={handleImageUpload}
        >
          <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
          {uploading ? "Uploading..." : "Edit Avatar"}
        </button>
      </div>
      <div className=" p-4 shadow-inner shadow-gray-700 rounded-xl flex items-start justify-between bg-[#272837]">
        <div className="flex gap-3 items-center">
          <Image
            src={profileLevels[data?.user?.profileLevel as ProfileLevel]?.icon}
            alt="User"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <p className=" text-sm font-bold text-[#848BAC] uppercase">
              PROFILE LEVEL
            </p>
            <h3 className="font-bold text-xl">
              {isPending ? "Loading..." : data.user?.profileLevel}
            </h3>
          </div>
        </div>
      </div>
      <div className=" mb-8 p-4 shadow-inner gap-2 bg-[#52FC18]/10 text-[#52FC18] shadow-gray-700 rounded-xl flex flex-col  ">
        <h2 className="  text-xl 2xl:text-2xl font-bold">
          Upgrade your PROFILE Level
        </h2>
        <p className=" text-sm font-thin text-green-600">
          Upgrade your PROFILE Level and get exclusive access to discord roles,
          events, prizes and discounts.
        </p>
        <div className="flex items-center justify-between mt-4">
          <h4 className="2xl:text-lg font-bold">PROGRESS TO NEXT LEVEL</h4>
          <h4 className="2xl:text-lg font-bold">
            {data?.user?.picksWon}/
            {profileLevels[data?.user?.profileLevel as ProfileLevel]?.target}{" "}
            PICKS WON
          </h4>
        </div>
        <div className=" w-full h-5 bg-[#393C53] rounded-md">
          <div
            className="bg-[#00B544] shadow-inner rounded-md shadow-gray-500 h-full"
            style={{
              width: `${(data?.user?.picksWon /
                profileLevels[data?.user?.profileLevel as ProfileLevel]
                  ?.target) *
                100
                }%`,
            }}
          ></div>
        </div>
      </div>
      <div className=" p-4 w-[60%] mx-auto shadow-inner shadow-gray-700 rounded-xl flex items-center flex-col gap-3 py-6  bg-[#272837]">
        <Image
          src={profileLevels[data?.user?.profileLevel as ProfileLevel]?.icon}
          alt="User"
          width={50}
          height={50}
        />
        <h3 className="font-bold text-xl 2xl:text-2xl">
          {isPending ? "Loading..." : data.user?.profileLevel}
        </h3>
        <p className=" font-bold text-xs uppercase">
          Win {profileLevels[data?.user?.profileLevel as ProfileLevel]?.target}{" "}
          Picks across all of your Accounts
        </p>
        <div className=" my-4 bg-[#181926] p-5 space-y-2 rounded-xl shadow-inner w-[90%]">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/role.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              Exclusive discord role
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/entry.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              special giveaway ENTRIES
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/discount.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              secret discounts
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              FIRST ACCESS TO FEATURES
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/bonus.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              PREMIUM BONUSES
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/invitation.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              EVENT INVITATIONS
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/support.png"
              alt="Coin Icon"
              width={26}
              height={26}
            />
            <h4 className=" font-bold uppercase text-xs 2xl:text-base">
              PRIORITY SUPPORT
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

type sortFilterType = "ALL" | "FUNDED" | "BREACHED";
const AccountsSection = ({ accounts }: { accounts: Account[] }) => {
  const [tab, setTab] = useState("hide");
  const [sortFilter, setSortFilter] = useState<sortFilterType>("ALL");
  // Sort Filter
  const changeSortFilter = (sortFilter: sortFilterType) => {
    setSortFilter(sortFilter);
  };

  // Filter
  const filteredData = useMemo(() => {
    // Tab Filer
    const filteredData = accounts?.filter((account: any) => {
      if (tab === "show") {
        return (
          account.status === "BREACHED" ||
          account.status === "FUNDED" ||
          account.status === "CHALLENGE"
        );
      } else if (tab === "hide") {
        return account.status !== "BREACHED";
      }
      return true;
    });

    // Sort Filter
    if (sortFilter === "FUNDED") {
      return filteredData?.filter(
        (account: any) => account.status === "FUNDED"
      );
    } else if (sortFilter === "BREACHED") {
      return filteredData?.filter(
        (account: any) => account.status === "BREACHED"
      );
    } else {
      return filteredData;
    }
  }, [tab, accounts, sortFilter]);

  return (
    <div className=" w-full space-y-5 bg-primary-100 py-6 px-2 md:p-3  rounded-2xl 2xl:p-5 mb-8">
      <div className=" w-full flex flex-col gap-3 md:flex-row items-center  justify-between">
        <h2 className=" 2xl:text-xl font-bold"> OVERVIEW</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-fit">
          {tab !== "show" ? (
            <button
              onClick={() => setTab("show")}
              className=" bg-[#272837]   justify-center  w-full md:w-fit text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2"
            >
              <Image
                src="/icons/check.png"
                alt="Arrow Icon"
                width={18}
                height={18}
              />
              SHOW BREACHED
            </button>
          ) : (
            <button
              onClick={() => setTab("hide")}
              className=" bg-[#272837]   justify-center  w-full md:w-fit text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2"
            >
              <Image
                src="/icons/hide.png"
                alt="Arrow Icon"
                width={18}
                height={18}
              />
              HIDE INACTIVE
            </button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className=" bg-[#272837]    justify-center w-full md:w-fit  text-xs 2xl:text-base px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
              <Image
                src="/icons/sort.png"
                alt="Arrow Icon"
                width={18}
                height={18}
              />
              SORT
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg text-xs 2xl:text-base">
              <DropdownMenuItem className="flex items-center justify-between " onClick={() => changeSortFilter("ALL")} >
                <p>ALL</p>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center justify-between " onClick={() => changeSortFilter("FUNDED")}>
                <p>FUNDED</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between " onClick={() => changeSortFilter("BREACHED")}>
                <p>BREACHED</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/create-account"
            className="shadow-green-400 font-bold   justify-center w-full md:w-fit inner-shadow text-sm px-3.5 py-2 rounded-xl inline-flex items-center gap-2"
          >
            <Image
              src="/icons/add.png"
              alt="Arrow Icon"
              width={18}
              height={18}
            />
            ADD ACCOUNT
          </Link>
        </div>
      </div>
      <div className="flex flex-col  items-center gap-4">
        {filteredData?.length === 0 && (
          <p className="text-white text-center capitalize">No {sortFilter} accounts found</p>
        )}
        {filteredData?.map((account, index) => (
          <div
            key={index}
            className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative  rounded-2xl w-full  flex flex-col gap-1 "
          >
            <div className=" w-full flex items-center justify-between">
              <p className=" text-white mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
                ${account.accountSize.replace("K", "000")}
              </p>
              <Image
                src={`${ACCOUNT_STATUS_ICON_DICT[account.status]}`}
                alt="Arrow Icon"
                width={100}
                height={100}
              />
            </div>
            <div className=" w-full flex items-center justify-between">
              <p className=" text-xs md:text-sm text-[#AFB2CA]  mb-3 mt-4 md:mt-1 2xl:text-lg ">
                ACCOUNT BALANCE
              </p>
              <p className=" text-white mb-3 mt-4 text-xs  md:mt-0 2xl:text-lg font-semibold">
                ${account.balance}
              </p>
            </div>
            <div className=" w-full flex items-center justify-between">
              <p className=" text-[#AFB2CA] text-xs md:text-sm mb-3 mt-4 md:mt-1 2xl:text-lg ">
                ACCOUNT NUMBER
              </p>
              <p className=" text-white mb-3 mt-4 text-xs md:text-sm md:mt-0 2xl:text-lg font-semibold">
                #{account.accountNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PayoutsSection = () => {
  const account = accountStore((state) => state.account);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false); // State to trigger refetch

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to trigger refetch when payout is successful
  const handlePayoutSuccess = () => {
    setShouldRefetch(true);
    setTimeout(() => setShouldRefetch(false), 500); // Reset refetch flag after triggering
  };

  return (
    <>
      <PayoutModal
        open={isModalOpen}
        onClose={closeModal}
        handlePayoutSuccess={handlePayoutSuccess}
      />
      <div className=" w-full space-y-5 bg-primary-100 py-6  md:p-3  rounded-2xl 2xl:p-5 mb-8">
        <div className=" bg-[#272837] p-3 pb-8 md:p-7  overflow-hidden relative min-h-32 2xl:min-h-44 rounded-2xl w-full  flex flex-col gap-1 ">
          <div className=" text-[#AFB2CA] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold flex justify-between items-center">
            Total Payout Amount
            {account.status === "FUNDED" && (
              <button
                type="submit"
                className="p-3.5 shadow-green-400 font-bold justify-center uppercase w-full md:w-fit inner-shadow text-sm rounded-xl inline-flex items-center gap-2 text-white disabled:opacity-20 hover:outline hover:outline-green-400/40"
                onClick={openModal}
              >
                {"Request Payout"}
              </button>
            )}
          </div>
          <div className=" flex items-center gap-4">
            <Image
              src="/icons/payout.svg"
              alt="Arrow Icon"
              width={45}
              height={45}
            />
            <p className="flex flex-col md:mt-0 text-3xl  2xl:text-4xl font-semibold">
              $
              {account.status === "FUNDED"
                ? account.totalFundedAmount -
                getOriginalAccountValue(account) || 0
                : 0}
              <span className="text-sm text-gray-400">
                You can only request payount once in 14 days.
              </span>
            </p>
          </div>
        </div>
        <FundedPayoutRequestsTable shouldRefetch={shouldRefetch} />
      </div>
    </>
  );
};

const CertificaeSection = () => {
  const account = accountStore((state) => state.account);
  const { data: payoutHistory, isPending: fetchingPayoutHistory } = useGetFundedPayout(account.id);
  const { data: accounts, isPending: fetchingAccounts } = useGetAccounts();
  const { mutate: sendCertificate, isPending } = useSendCertificate({
    onSuccess: () => {
      toast.success("Certificate sent successfully");
    },
    onError: (error: any) => {
      // console.log("Failed to send certificate", error);
      toast.error("Failed to send certificate");
    },
  });

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account: Account) => account.status === "FUNDED");
  }, [accounts]);

  const handleSendCertificate = (
    certificateType: CertificateType,
    accountId?: string
  ) => {
    sendCertificate({
      certificateType,
      accountId: accountId || account.id,
    });
  };

  return (
    <div
      className={`w-full flex flex-col space-y-5 py-6  md:p-3  rounded-2xl 2xl:p-5  mb-8 transition-opacity
      ${isPending
          ? " opacity-20 pointer-events-none "
          : " opacity-100 pointer-events-auto"
        }
    `}
    >
      <button
        className=" bg-[#272837] shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center  overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3"
      >
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/funded_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            FUNDED
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          Click to get your certificate
        </p>
        <Dialog>
          {!fetchingAccounts && filteredAccounts.length > 0 ? (
            <DialogTrigger className=" flex items-center px-4 py-1.5  shadow-inner shadow-gray-600 rounded-xl gap-1 text-white font-bold 2xl:text-lg ">
              <Image
                src="/icons/certificate.svg"
                alt="Arrow Icon"
                width={20}
                height={20}
              />
              VIEW {filteredAccounts.length} CERTIFICATES
            </DialogTrigger>
          ) : !fetchingAccounts && filteredAccounts.length === 0 ? (
            <div className="flex items-center px-4 py-1.5  shadow-inner shadow-gray-600 rounded-xl gap-1 text-white font-bold 2xl:text-lg">
              No funded accounts
            </div>
          ) : (
            <div className="flex items-center px-4 py-1.5  shadow-inner shadow-gray-600 rounded-xl gap-1 text-white font-bold 2xl:text-lg">
              <LoaderCircleIcon className="animate-spin mr-2" />
              Loading...
            </div>
          )}
          <DialogContent className=" bg-primary-100 text-white p-8 border-none">
            <DialogHeader>
              <DialogTitle className=" text-xl font-bold mb-4">
                FUNDED CERTIFICATES
              </DialogTitle>
              <div className="flex flex-col gap-2 w-full">
                {filteredAccounts.length === 0 && (
                  <div className=" p-4 bg-[#272837] rounded-xl py-8 shadow-inner shadow-gray-700 flex items-center justify-between">
                    <div className="flex items-center ">
                      <div className="w-12 h-12 rounded-xl mr-2.5 bg-gray-700"></div>
                      <div className=" flex flex-col  gap-1">
                        <h2 className=" text-sm md:text-base font-bold">
                          No funded accounts
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                {!fetchingAccounts &&
                  filteredAccounts.map((account: Account) => (
                    <div className=" p-4 bg-[#272837] rounded-xl py-8 shadow-inner shadow-gray-700 flex items-center justify-between">
                      <div className="flex items-center ">
                        <div className=" flex flex-col  gap-1">
                          <h2 className=" text-sm md:text-base font-bold">
                            {account.accountNumber}
                          </h2>
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center gap-2"
                        onClick={() =>
                          handleSendCertificate("FUNDED", account.id)
                        }
                      >
                        <Image
                          src="/icons/download.png"
                          alt="Arrow Icon"
                          width={15}
                          height={15}
                        />
                        <p className="text-xs text-[#52FC18] font-bold">
                          DOWNLOAD
                        </p>
                      </button>
                    </div>
                  ))}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </button>
      <button
        className=" bg-[#272837] shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 disabled:opacity-20 disabled:cursor-not-allowed"
        disabled={!(account.status === "FUNDED" && payoutHistory.length > 0)}
        onClick={() => account.status === "FUNDED" && payoutHistory.length > 0 && handleSendCertificate("PAYOUT")}
      >
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/payout_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            PAYOUT
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          Click to get your certificate
        </p>
      </button>

      <button
        className=" bg-[#272837] shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 disabled:opacity-20 disabled:cursor-not-allowed"
        disabled={!(account.status === "FUNDED" && payoutHistory.length > 0)}
        onClick={() => account.status === "FUNDED" && payoutHistory.length > 0 && handleSendCertificate("LIFETIME_PAYOUT")}
      >
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/lifetime_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            LIFETIME PAYOUT
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          Click to get your certificate
        </p>
      </button>
      <div
        className=" bg-[#272837]  shadow-inner shadow-gray-700 p-3 pb-8 md:p-7 text-center overflow-hidden relative min-h-32 2xl:min-h-44 items-center rounded-2xl w-full  flex flex-col gap-3 "
        role="button"
        onClick={() => handleSendCertificate("PROFILE_LEVEL")}
      >
        <div className=" flex items-center gap-2">
          <Image
            src="/icons/funded_c.svg"
            alt="Arrow Icon"
            width={40}
            height={40}
            className=" mt-1"
          />
          <p className=" text-xl  2xl:text-3xl text-[#52FC18] font-semibold">
            PROFILE LEVEL
          </p>
        </div>
        <p className=" uppercase tracking-wide text-[#848BAC] mb-3 mt-4 md:mt-0 2xl:text-lg font-semibold">
          Click to get your certificate
        </p>
      </div>
    </div>
  );
};
