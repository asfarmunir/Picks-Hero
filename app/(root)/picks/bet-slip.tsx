import Image from "next/image";
import React from "react";

interface Bet {
  id: number;
  team: string;
  odds: number;
  pick: number;
  toWin: number;
  oddsFormat: "decimal" | "american";
  home_team: string;
  away_team: string;
  sport: string;
  event: string;
}

const BetSlip = ({
  bet,
  removeBet,
  onPickInputChange,
}: {
  bet: Bet;
  removeBet: (id: number) => void;
  onPickInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
}) => {

  const calculateMoneyLine = (odds: number, oddsFormat: "decimal" | "american", pick: number) => {
    let americanOdds = odds;
    if(oddsFormat === "decimal") {
      americanOdds = decimalToAmericanOdds(odds);
    }
    if(americanOdds > 0) {
      return `+${((pick)*(americanOdds/100)).toFixed(2)}`;
    } else {
      return `-${((pick)*(100/Math.abs(americanOdds))).toFixed(2)}`;
    }
  }

  const decimalToAmericanOdds = (decimalOdds: number) => {
    if (decimalOdds >= 2) {
      // Positive American odds
      return ((decimalOdds - 1) * 100);
    } else {
      // Negative American odds
      return (-100 / (decimalOdds - 1));
    }
  };
  return (
    <div className="py-4">
      <div className=" w-full mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="uppercase  text-sm">
            {bet.team}{" "}
            <span className="text-white text-opacity-40">
              {"("}
              {bet.oddsFormat}
              {" format )"}
            </span>
          </p>
        </div>
        <button onClick={() => removeBet(bet.id)}>
          <Image
            src="/icons/discard.png"
            alt="Arrow Icon"
            width={23}
            height={23}
          />
        </button>
      </div>
      <div className=" w-full mb-4  rounded-xl text-primary-50 bg-[#52FC18]/20 p-3 flex items-center justify-between">
        <p className="text-sm font-thin capitalize">money line</p>
        <p className="font-bold">{calculateMoneyLine(bet.odds, bet.oddsFormat, bet.pick)}</p>
      </div>
      <div className="w-full flex items-center gap-3">
        <div className="bg-[#272837] rounded-xl p-3.5 flex flex-col gap-2.5 flex-grow">
          <p className=" text-xs font-thin text-primary-200">Pick</p>
          <div className="flex gap-2">
            <input
              className=" font-bold bg-transparent focus:outline-none border border-transparent focus:border-primary-50 w-24 rounded-sm px-2"
              // value={bet.pick.toFixed(2)}
              defaultValue={bet.pick.toFixed(2)}
              onChange={(e) => onPickInputChange(e, bet.id)}
              type="number"
            />
            <p className="font-bold">$</p>
          </div>
        </div>
        <div className="bg-[#272837] rounded-xl p-3.5 flex flex-col gap-2.5 flex-grow">
          <p className=" text-xs font-thin text-primary-200">To Win</p>
          <h2 className=" font-bold">{bet.toWin.toFixed(2)}$</h2>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
