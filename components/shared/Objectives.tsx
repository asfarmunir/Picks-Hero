import Image from "next/image";
import React from "react";

const Objectives = () => {
  return (
    <div className=" w-full space-y-4">
      <div className="w-full flex-col bg-[#181926] shadow-inner p-5 rounded-xl shadow-gray-700 md:flex-row  flex items-center justify-between gap-4">
        <h3 className="text-lg 2xl:text-xl font-bold flex items-center gap-1.5">
          <Image
            src="/icons/stack.png"
            alt="Arrow Icon"
            width={23}
            height={23}
          />
          $10,000
          <span className=" text-primary-200">ACCOUNT</span>
        </h3>
        <div className="flex w-full md:w-fit items-center gap-2 flex-col md:flex-row">
          <button className="flex justify-center items-center gap-2 px-4 py-1.5 text-xs w-full md:w-fit 2xl:text-base font-bold bg-[#333547] shadow-inner shadow-gray-600 rounded-lg">
            <Image
              src="/icons/calender.svg"
              alt="Arrow Icon"
              width={20}
              height={20}
            />
            <span className="text-primary-200 uppercase">start date</span>
            jun,23 2023
          </button>
          <button className="flex justify-center text-primary-50 uppercase items-center gap-2 px-4 py-2 text-xs w-full md:w-fit 2xl:text-base font-bold  bg-[#52FC18]/10 rounded-lg">
            <Image
              src="/icons/moon.png"
              alt="Arrow Icon"
              width={18}
              height={18}
            />
            PHASE 1/2
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full flex-col bg-[#181926] shadow-inner p-5 py-6 rounded-xl shadow-gray-700 md:flex-row  flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/profit.svg"
              alt="Arrow Icon"
              width={43}
              height={43}
            />
            <div className="  font-bold flex flex-col  gap-1">
              <p className=" text-base 2xl:text-lg ">$768 / $1,000</p>
              <span className=" text-xs 2xl:text-sm text-primary-200">
                PROFIT TARGET
              </span>
            </div>
          </div>
          <div className=" hidden md:flex flex-col items-end gap-2">
            <p className=" text-green-600 font-thin text-sm">1.8%</p>
            <div className=" w-36 h-4 bg-[#393C53] rounded-sm border-gray-700">
              <div className=" w-[30%] h-full bg-[#00B544] rounded-sm shadow-inner shadow-gray-700 "></div>
            </div>
          </div>
        </div>
        <div className="w-full flex-col bg-[#181926] shadow-inner p-5 py-6 rounded-xl shadow-gray-700 md:flex-row  flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/loss.svg"
              alt="Arrow Icon"
              width={43}
              height={43}
            />
            <div className="  font-bold flex flex-col  gap-1">
              <p className=" text-base 2xl:text-lg ">-$1234 / -$5,000</p>
              <span className=" text-xs 2xl:text-sm uppercase text-primary-200">
                Maximum daily loss
              </span>
            </div>
          </div>
          <div className=" hidden md:flex flex-col items-end gap-2">
            <p className=" text-red-600 font-thin text-sm">-1.8%</p>
            <div className=" w-36 h-4 bg-[#393C53] rounded-sm border-gray-700">
              <div className=" w-[30%] h-full bg-[#F74418] rounded-sm shadow-inner shadow-gray-700 "></div>
            </div>
          </div>
        </div>
        <div className="w-full flex-col bg-[#181926] shadow-inner p-5 py-6 rounded-xl shadow-gray-700 md:flex-row  flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/max-loss.svg"
              alt="Arrow Icon"
              width={43}
              height={43}
            />
            <div className="  font-bold flex flex-col  gap-1">
              <p className=" text-base 2xl:text-lg ">-$1234 / -$5,000</p>
              <span className=" text-xs 2xl:text-sm uppercase text-primary-200">
                Maximum loss
              </span>
            </div>
          </div>
          <div className=" hidden md:flex flex-col items-end gap-2">
            <p className=" text-red-600 font-thin text-sm">-1.8%</p>
            <div className=" w-36 h-4 bg-[#393C53] rounded-sm border-gray-700">
              <div className=" w-[30%] h-full bg-[#F74418] rounded-sm shadow-inner shadow-gray-700 "></div>
            </div>
          </div>
        </div>
        <div className="w-full flex-col bg-[#181926] shadow-inner p-5 py-6 rounded-xl shadow-gray-700 md:flex-row  flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/min-picks.svg"
              alt="Arrow Icon"
              width={43}
              height={43}
            />
            <div className="  font-bold flex flex-col  gap-1">
              <p className=" text-base 2xl:text-lg ">5/20</p>
              <span className=" text-xs 2xl:text-sm text-primary-200">
                MINIMUM NUMBER OF PICKS
              </span>
            </div>
          </div>
          <div className=" hidden md:flex flex-col items-end gap-2">
            <p className=" text-green-600 font-thin text-sm">1.8%</p>
            <div className=" w-36 h-4 bg-[#393C53] rounded-sm border-gray-700">
              <div className=" w-[30%] h-full bg-[#00B544] rounded-sm shadow-inner shadow-gray-700 "></div>
            </div>
          </div>
        </div>
        <div className="w-full flex-col bg-[#181926] shadow-inner p-5 py-6 rounded-xl shadow-gray-700 md:flex-row  flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/sports.svg"
              alt="Arrow Icon"
              width={43}
              height={43}
            />
            <div className="  font-bold flex flex-col  gap-1">
              <p className=" text-base 2xl:text-lg ">1/5 SPORTS</p>
              <span className=" text-xs 2xl:text-sm text-primary-200">
                DIVERSITY OF SPORTS
              </span>
            </div>
          </div>
          <div className=" hidden md:flex flex-col items-end gap-2">
            <p className=" text-green-600 font-thin text-sm">1.8%</p>
            <div className=" w-36 h-4 bg-[#393C53] rounded-sm border-gray-700">
              <div className=" w-[30%] h-full bg-[#00B544] rounded-sm shadow-inner shadow-gray-700 "></div>
            </div>
          </div>
        </div>
        <div className="w-full flex-col bg-[#181926] shadow-inner p-5 py-6 rounded-xl shadow-gray-700 md:flex-row  flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/time.svg"
              alt="Arrow Icon"
              width={43}
              height={43}
            />
            <div className="  font-bold flex flex-col  gap-1">
              <p className=" text-base 2xl:text-lg ">2D 41mins 31s</p>
              <span className=" text-xs 2xl:text-sm text-primary-200">
                TIME REMAINING
              </span>
            </div>
          </div>
          <div className=" hidden md:flex flex-col items-end gap-2">
            <p className=" text-green-600 font-thin text-sm">1.8%</p>
            <div className=" w-36 h-4 bg-[#393C53] rounded-sm border-gray-700">
              <div className=" w-[30%] h-full bg-[#00B544] rounded-sm shadow-inner shadow-gray-700 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
