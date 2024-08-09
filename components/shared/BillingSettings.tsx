import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
const BillingSettings = () => {
  return (
    <div className=" w-full space-y-5 bg-primary-100 py-6  md:p-3  rounded-2xl 2xl:p-5 mb-8">
      <div className=" bg-[#272837] p-3 pb-8 md:p-7   rounded-2xl w-full  flex flex-col gap-1 ">
        <div className="flex items-center justify-between pb-6 border-b border-gray-700 mb-3">
          <p className=" text-white  2xl:text-lg uppercase font-bold">
            Payment Method
          </p>
          <p className=" text-primary-50 flex items-center gap-1.5 2xl:text-base text-xs uppercase font-bold">
            <Image
              src="/icons/wallet.svg"
              alt="Edit Icon"
              width={17}
              height={17}
            />
            update
          </p>
        </div>

        <div className=" flex items-center gap-4 bg-[#333547] p-5 rounded-lg w-full">
          <Image
            src="/images/visa.png"
            alt="Arrow Icon"
            width={48}
            height={48}
          />
          <p className="   md:mt-0 text-lg  2xl:text-2xl font-semibold">
            **** **** **** 5645
          </p>
        </div>
      </div>
      <div className=" w-full border border-gray-700 rounded-xl  flex flex-col">
        <div className="flex items-center justify-between w-full p-6 ">
          <h3 className=" font-bold"> Billing History</h3>
        </div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className=" bg-[#333547] text-[#848BAC] border-none">
            <TableRow className=" border-none">
              <TableHead className="uppercase  font-bold text-center">
                Date
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                INVOICE NUMBER
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                amount
              </TableHead>
              <TableHead className="uppercase font-bold text-center">
                invoice
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className=" border-none">
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                07 jul 2024 at 34:23pm
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                123456789123456789
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                €10.00
              </TableCell>

              <TableCell className=" font-semibold max-w-[100px]  capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base  justify-center ">
                <p className="flex items-center gap-1 text-xs  text-primary-50 font-semibold ">
                  <Image
                    src="/icons/download.png"
                    alt="Coin Icon"
                    width={14}
                    className="mb-0.5"
                    height={14}
                  />
                  <span className=" ">DOWNLOAD</span>
                </p>
              </TableCell>
            </TableRow>
            <TableRow className=" border-none">
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                07 jul 2024 at 34:23pm
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                123456789123456789
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                €10.00
              </TableCell>

              <TableCell className=" font-semibold max-w-[100px]  capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base  justify-center ">
                <p className="flex items-center gap-1 text-xs  text-primary-50 font-semibold ">
                  <Image
                    src="/icons/download.png"
                    alt="Coin Icon"
                    width={14}
                    className="mb-0.5"
                    height={14}
                  />
                  <span className=" ">DOWNLOAD</span>
                </p>
              </TableCell>
            </TableRow>
            <TableRow className=" border-none">
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                07 jul 2024 at 34:23pm
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                123456789123456789
              </TableCell>
              <TableCell className=" font-semibold max-w-[100px] capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base text-center truncate">
                €10.00
              </TableCell>

              <TableCell className=" font-semibold max-w-[100px]  capitalize py-6 border-b border-gray-700 text-xs 2xl:text-base  justify-center ">
                <p className="flex items-center gap-1 text-xs  text-primary-50 font-semibold ">
                  <Image
                    src="/icons/download.png"
                    alt="Coin Icon"
                    width={14}
                    className="mb-0.5"
                    height={14}
                  />
                  <span className=" ">DOWNLOAD</span>
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-5">
          <h4 className="text-[#848BAC] font-thin text-xs 2xl:text-base ">
            PAGE 1-5
          </h4>
          <div className="flex gap-2 items-center">
            <button className="text-[#848BAC] text-2xl">
              <TiArrowLeft />
            </button>
            <button className="text-[white] text-2xl">
              <TiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
