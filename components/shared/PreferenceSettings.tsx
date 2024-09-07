"use client";

import Image from "next/image";
import { Switch } from "../ui/switch";
import { useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";

const PreferenceSettings = () => {
  const [displayStatsLive, setDisplayStatsLive] = useState(false);
  const [phoneNotification, setPhoneNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);


  const handleToggleChange = async (field: any, checked: any) => {
    if (checked) {
      try {
        const response = await axios.patch("http://localhost:3000/api/preferences", {
          field,
          value: true,
        });

        if (response.status !== 200) {
          throw new Error("Failed to update preferences");
        }
  
        console.log("Preferences updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating preferences:", error);
      }
    }
  };
  
  return (
    <div className=" w-full flex text-white flex-col gap-4">
      <div className=" w-full flex justify-between py-4 pb-8 border-b border-gray-700">
        <div className="flex flex-col gap-1">
          <h3 className=" text-lg uppercase font-bold">Display Stats Live</h3>

          <p className="text-sm text-[#848BAC] tracking-wide ">
            Display your stats online publicly.
          </p>
        </div>
        <Switch
          checked={displayStatsLive}
          onChange={(checked:any):any => {
            setDisplayStatsLive(checked);
            handleToggleChange("displayStatsLive", checked);
          }}
        />
      </div>
      <div className=" w-full flex justify-between py-4 pb-8 border-b border-gray-700">
        <div className="flex flex-col gap-1">
          <h3 className=" text-lg uppercase font-bold">Phone Notifications</h3>

          <p className="text-sm text-[#848BAC] tracking-wide ">
            Toggle whether you want to receive phone notifications.
          </p>
        </div>
        <Switch
          checked={phoneNotification}
          onChange={(checked:any):any => {
            setPhoneNotification(checked);
            handleToggleChange("phoneNotification", checked);
          }}
        />
      </div>
      <div className=" w-full flex justify-between py-4 pb-8 border-b border-gray-700">
        <div className="flex flex-col gap-1">
          <h3 className=" text-lg uppercase font-bold">Email Notifications</h3>

          <p className="text-sm text-[#848BAC] tracking-wide max-w-md ">
            Toggle whether you want to receive email notifications.
          </p>
        </div>
        <Switch
        checked={emailNotification}
        onChange={(checked:any):any => {
          setDisplayStatsLive(checked);
          handleToggleChange("displayStatsLive", checked);
        }} />
      </div>
      <div className=" w-full flex justify-between py-4  ">
        <div className="flex flex-col gap-1">
          <h3 className=" text-lg uppercase font-bold">ODDS DISPLAY</h3>

          <p className="text-sm text-[#848BAC] tracking-wide max-w-md ">
            Toggle to display moneyline or odds.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className=" bg-[#393C53]  font-bold   justify-center w-full text-sm 2xl:text-base md:w-fit  px-4  rounded-xl inline-flex items-center gap-2">
            <Image
              src="/icons/odds.png"
              alt="Arrow Icon"
              width={18}
              height={18}
            />
            <span className="text-[#737897] ">Odds:</span>
            AMERICAN
            <FaAngleDown className=" text-lg ml-0.5 mb-0.5 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg text-xs 2xl:text-base">
            <DropdownMenuItem className="flex items-center justify-between ">
              <p> ITEMS</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center justify-between ">
              <p>FUNDED</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between ">
              <p> ITEMS</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </div>
    </div>
  );
};

export default PreferenceSettings;
