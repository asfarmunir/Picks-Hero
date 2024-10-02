"use client";
import { useCreateBet } from "@/app/hooks/useCreateBet";
import { useGetAccount } from "@/app/hooks/useGetAccount";
import { useGetSports } from "@/app/hooks/useGetSports";
import BetModal from "@/components/shared/BetModal";
import Navbar from "@/components/shared/Navbar";
import UserAccount from "@/components/shared/UserAccount";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaAngleDown } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { MdOutlineArrowUpward } from "react-icons/md";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import BetSlip from "./bet-slip";
import GamesTable from "./games";
import { americanToDecimalOdds, calculateToWin } from "@/lib/utils";

type oddsType = "american" | "decimal";

interface Bet {
  id: number;
  team: string;
  odds: number;
  pick: number;
  toWin: number;
  home_team: string;
  away_team: string;
  oddsFormat: "decimal" | "american";
  gameDate: string;
  sport: string;
  event: string;
  league: string;
}

const page = () => {
  // ACCOUNT
  const { data: account, isPending: loadingAccount } = useGetAccount(
    "66f870324f9d0a9dc1b1dc62"
  );

  // BET SLIP DATA
  const [selectedBets, setSelectedBets] = React.useState<Bet[]>([]);
  const [toCollect, setToCollect] = React.useState<string>("0.00");
  const addBet = (bet: Bet) => {
    setSelectedBets([...selectedBets, bet]);
  };
  const removeBet = (id: number) => {
    setSelectedBets(selectedBets.filter((bet) => bet.id !== id));
  };
  const calculateOverallOdds = () => {
    let overallOdds = 1;

    // Multiply odds for each bet
    selectedBets.forEach((bet) => {
      const decimalOdds =
        bet.oddsFormat === "american"
          ? americanToDecimalOdds(bet.odds)
          : bet.odds;
      overallOdds *= decimalOdds;
    });

    return overallOdds.toFixed(2);
  };

  const calculateToCollect = () => {
    let overallOdds = 1;

    // Multiply odds for each bet
    selectedBets.forEach((bet) => {
      const decimalOdds =
        bet.oddsFormat === "american"
          ? americanToDecimalOdds(bet.odds)
          : bet.odds;
      overallOdds *= decimalOdds;
    });

    // For parlays
    let totalBetAmount = 0;
    selectedBets.forEach((bet) => {
      totalBetAmount += bet.pick; // Sum the total bet amount (wagered amount)
    });

    // Calculate parlay payout: betAmount * (overallOdds - 1)
    const potentialPayout = totalBetAmount * (overallOdds - 1);

    return potentialPayout.toFixed(2); // Return net profit from parlay
  };
  const onPickInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = parseFloat(e.target.value);
    const updatedBets = selectedBets.map((bet) => {
      if (bet.id === id) {
        return {
          ...bet,
          pick: value,
          toWin: calculateToWin(bet, value),
        };
      }
      return bet;
    });
    setSelectedBets(updatedBets);
  };

  useEffect(()=>{
  setToCollect(calculateToCollect());
  }, [selectedBets])

  // TABS MECHANISM
  const [tab, setTab] = React.useState("football");
  const changeTab = (tab: string) => {
    const leaguesArray = data.filter((sport: any) => sport.group === tab);
    setLeagues(leaguesArray);
    setTab(tab);
    changeLeagueTab(leaguesArray[0].key);
  };

  const [leagueTab, setLeagueTab] = React.useState("");
  const changeLeagueTab = (league: string) => {
    setLeagueTab(league);
  };

  // ODDS FORMAT
  const [oddsFormat, setOddsFormat] = React.useState<oddsType>("american");
  const changeOddsFormat = (format: oddsType) => {
    setOddsFormat(format);
  };

  // FEATURED MATCH
  const [featuredMatch, setFeaturedMatch] = React.useState<any>(null);

  // SPORTS DATA
  const { data, isPending, isError } = useGetSports();
  const [sports, setSports] = React.useState<any>([]);
  const [leagues, setLeagues] = React.useState<any>([]);

  useEffect(() => {
    if (data) {
      const sportsArray: string[] = data.map(
        (sport: any) => sport.group as string
      );
      const uniqueSports = sportsArray.filter(function (item, pos) {
        return sportsArray.indexOf(item) == pos;
      });
      setSports(uniqueSports);

      const leaguesArray = data.filter(
        (sport: any) => sport.group === uniqueSports[0]
      );
      setLeagues(leaguesArray);

      changeTab(uniqueSports[0]);
      changeLeagueTab(leaguesArray[0].key);
    }
  }, [data]);

  // PLACE BETS
  const { mutate: placeBet, isPending: placingBet } = useCreateBet({
    onSuccess: (data) => {
      setSelectedBets([]);
      toast.success("Bet placed successfully");
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  const placeBets = async () => {
    if (selectedBets.length === 0) {
      toast.error("No bets selected");
      return;
    }

    let alteredBet;
    if (selectedBets.length === 1) {
      const bet = selectedBets[0];
      alteredBet = {
        eventId: [bet.id.toString()],
        sportKey: [bet.league],
        sport: [bet.sport],
        event: [bet.event],
        league: [bet.league],
        team: [bet.team],
        odds: bet.odds,
        pick: bet.pick,
        winnings: bet.toWin,
        oddsFormat: bet.oddsFormat.toUpperCase(),
        gameDate: [new Date(bet.gameDate)],
      };
    } else if (selectedBets.length > 1) {
      // create a parlay
      let totalPick = 0;
      const eventIds: string[] = [];
      const sports: string[] = [];
      const events: string[] = [];
      const leagues: string[] = [];
      const teams: string[] = [];
      const gameDates: Date[] = [];
      selectedBets.forEach((bet) => {
        eventIds.push(bet.id.toString());
        sports.push(bet.sport);
        events.push(bet.event);
        leagues.push(bet.league);
        teams.push(bet.team);
        gameDates.push(new Date(bet.gameDate));
        totalPick += bet.pick;
      });
      alteredBet = {
        eventId: eventIds,
        sportKey: leagues,
        sport: sports,
        event: events,
        league: leagues,
        team: teams,
        odds: Number(calculateOverallOdds()),
        pick: totalPick,
        winnings: Number(calculateToCollect()),
        oddsFormat: "DECIMAL",
        gameDate: gameDates,
      };
    }

    if (!alteredBet) return;

    placeBet({
      bet: alteredBet,
      accountNumber: "PH4504514-22",
    });
  };

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
          <div className="flex items-center gap-2">
            <UserAccount />
            <BetModal />
          </div>
          <Navbar />
        </div>
      </div>

      <div className=" md:pt-16 relative px-2.5 md:px-5 2xl:px-8 2xl:mt-4 pb-24 text-white  max-h-full overflow-auto space-y-6 ">
        <div className=" w-full flex md:hidden items-center justify-between">
          <UserAccount />
        </div>

        {isPending ? <SkeletonLoader /> : null}
        {!isPending && (
          <>
            <SportsTabs sports={sports} tab={tab} changeTab={changeTab} />
            <LeaguesTabs
              leagues={leagues}
              leagueTab={leagueTab}
              changeLeagueTab={changeLeagueTab}
            />
          </>
        )}
        <div className="w-full bg-[#181926] shadow-inner shadow-gray-700 rounded-xl p-5 py-7 flex-col md:flex-row  flex items-center justify-between gap-4">
          <div className="flex flex-col  items-start justify-start  w-full md:w-fit  ">
            <h3 className="text-lg 2xl:text-2xl font-bold mb-1">Featured</h3>
            <p className="  text-xs 2xl:text-base text-[#848BAC] max-w-md">
              Don't miss out on exclusive boosted odds and special in-play
              betting options available only for this feature event.
            </p>
          </div>
          <div className="flex w-full md:w-fit items-center gap-2 flex-col md:flex-row">
            <button className="flex justify-center items-center gap-2 p-4 text-sm w-full md:w-fit 2xl:text-lg  bg-[#272837] shadow-inner shadow-gray-600 rounded-lg">
              {featuredMatch?.home_team}
            </button>
            <p className=" p-1.5 text-sm px-2 rounded-full font-bold -mx-4 -my-4 z-30 text-primary-50 bg-green-700/30 border-green-700/40 border-2">
              vs
            </p>
            <button className="flex justify-center items-center gap-2 p-4 text-sm w-full md:w-fit 2xl:text-lg  bg-[#272837] shadow-inner shadow-gray-600 rounded-lg">
              {featuredMatch?.away_team}
            </button>
            <button className="flex justify-center uppercase items-center gap-2 p-4 text-sm w-full md:w-fit 2xl:text-base font-bold bg-[#333547] inner-shadow rounded-lg">
              BET NOW
            </button>
          </div>
        </div>
        <div className=" w-full flex gap-5 flex-col-reverse md:flex-row rounded-2xl mb-8 items-start">
          <div className=" w-full transition-all border border-gray-700 rounded-xl bg-primary-100  flex flex-col">
            <div className="flex flex-col md:flex-row  mb-4 w-full items-center justify-between">
              <div className="flex  items-center gap-3 w-full p-2 md:p-6 md:pr-32 ">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" bg-[#393C53]    justify-center text-nowrap w-fit  text-xs md:text-sm px-3 md:px-4 py-3 font-bold rounded-lg inline-flex items-center gap-2">
                    TOP EARNERS
                    <FaAngleDown className=" text-lg" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg shadow-sm">
                    <DropdownMenuItem className="flex items-center justify-between ">
                      <p>TOP EARNERS</p>

                      <MdOutlineArrowUpward className="text-lg" />
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center justify-between ">
                      <p>AVERAGE</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between ">
                      <p>BOTTOM EARNERS</p>
                      <MdOutlineArrowUpward className="text-lg rotate-180" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>{" "}
                <div className=" bg-[#333547]/60 inline-flex  items-center py-1 px-2 rounded-lg">
                  <LuSearch className="w-7 h-7 text-[#848BAC] " />
                  <Input
                    className=" 
                bg-transparent
                text-[#848BAC]

                focus:outline-0
                focus:ring-0
                focus:border-none
                placeholder-slate-900 
                uppercase
                "
                    placeholder={"search..."}
                  />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="  bg-[#393C53]  font-bold   justify-center w-[95%] text-sm 2xl:text-base md:w-fit  p-3.5 md:mr-3  rounded-xl inline-flex items-center gap-2 uppercase">
                  <Image
                    src="/icons/odds.png"
                    alt="Arrow Icon"
                    width={23}
                    height={23}
                  />
                  <span className="text-[#737897] capitalize">Odds:</span>
                  {oddsFormat}
                  <FaAngleDown className=" text-lg ml-0.5 mb-0.5 " />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48  bg-[#181926] text-white border-none  mt-1  p-3 rounded-lg text-xs 2xl:text-base">
                  <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => changeOddsFormat("decimal")}
                  >
                    <p> Decimal</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex items-center justify-between "
                    onClick={() => changeOddsFormat("american")}
                  >
                    <p>American</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>{" "}
            </div>
            {account && (
              <GamesTable
                tab={tab}
                sportKey={leagueTab}
                oddsFormat={oddsFormat}
                addBet={addBet}
                bets={selectedBets}
                setFeaturedMatch={setFeaturedMatch}
                account={account}
              />
            )}
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
          <div
            className={` w-full md:w-[65%]  border border-gray-700 p-4 rounded-xl bg-primary-100  flex flex-col`}
          >
            <div className="flex items-start gap-4 mb-8 md:items-center justify-between md:mb-5  flex-col md:flex-row w-full">
              <h2 className="font-bold text-lg uppercase">betting slip</h2>
              <div className="flex items-center border-gray-[#737897] rounded-lg bg-[#737897]/20">
                <button
                  className={` ${
                    selectedBets.length === 1
                      ? "text-white"
                      : "text-primary-200"
                  } text-xs font-bold p-2p px-3  uppercase border-r border-gray-700`}
                >
                  single
                </button>
                <button
                  className={`text-xs font-bold p-2 px-3 uppercase ${
                    selectedBets.length > 1 ? "text-white" : "text-primary-200"
                  }`}
                >
                  combination
                </button>
              </div>
            </div>

            {selectedBets.length === 0 && (
              <div className="flex items-center justify-center h-96 w-full">
                <p className="text-[#848BAC] text-sm 2xl:text-lg uppercase">
                  No bets selected
                </p>
              </div>
            )}

            {account &&
              selectedBets.map((bet, index) => (
                <>
                  <BetSlip
                    key={index}
                    bet={bet}
                    removeBet={removeBet}
                    onPickInputChange={onPickInputChange}
                  />
                </>
              ))}
            <div className=" w-full  mt-3 border-t border-gray-700 py-3 flex items-center justify-between">
              <p className="text-sm  text-primary-200 font-thin     ">
                OVERALL ODDS
              </p>
              <p className="font-bold">{calculateOverallOdds()}</p>
            </div>
            <div className=" w-full mb-4  flex items-center - justify-between">
              <p className="text-sm  text-primary-200 font-thin     ">
                TO COLLECT
              </p>
              <p className="font-bold">{toCollect} USD</p>
            </div>

            <div className=" w-full  border-t border-gray-700 py-3 flex items-center justify-between">
              <button
                className=" p-3.5 px-4 uppercase font-bold bg-[#393C53] text-xs rounded-lg"
                onClick={() => setSelectedBets([])}
              >
                clear
              </button>
              <button
                className=" p-3.5 uppercase font-bold inner-shadow text-xs rounded-lg disabled:opacity-50"
                disabled={placingBet}
                onClick={placeBets}
              >
                {placingBet ? "Placing bet..." : "place pick"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

const SkeletonLoader = () => {
  return (
    <div className="flex mt-4 items-center pb-3 max-w-full overflow-auto justify-evenly md:justify-start gap-2 mb-3">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-slate-600 animate-pulse w-full min-w-16 md:w-fit flex-grow md:flex-grow-0 rounded-full px-4 py-2 h-10"
        ></div>
      ))}
    </div>
  );
};

const SportsTabs = ({
  sports,
  tab,
  changeTab,
}: {
  sports: any;
  tab: string;
  changeTab: (sport: string) => void;
}) => {
  return (
    <div className="flex mt-4 items-center pb-3 max-w-full overflow-auto justify-evenly md:justify-start gap-2 mb-3">
      {sports?.map((sport: any, index: number) => (
        <button
          key={index}
          className={`border  
              px-4 text-xs 2xl:text-lg py-2 flex w-full md:w-fit justify-center font-bold text-nowrap  items-center flex-grow md:flex-grow-0 rounded-full ${
                tab === sport
                  ? "border-[#52FC18] bg-[#1A5B0B]"
                  : " border-gray-700 text-[#848BAC] border-2"
              } uppercase`}
          onClick={() => changeTab(sport)}
        >
          {sport}
        </button>
      ))}
    </div>
  );
};

const LeaguesTabs = ({
  leagues,
  leagueTab,
  changeLeagueTab,
}: {
  leagues: any;
  leagueTab: string;
  changeLeagueTab: (league: string) => void;
}) => {
  return (
    <div className="flex mt-4 items-center pb-3 max-w-full overflow-auto justify-evenly md:justify-start gap-2 mb-3">
      {leagues?.map((league: any, index: number) => (
        <button
          key={index}
          className={`border  
              px-4 text-xs 2xl:text-lg py-2 flex w-full md:w-fit justify-center font-bold text-nowrap  items-center flex-grow md:flex-grow-0 rounded-full ${
                leagueTab === league.key
                  ? "border-[#52FC18] bg-[#1A5B0B]"
                  : " border-gray-700 text-[#848BAC] border-2"
              } uppercase`}
          onClick={() => changeLeagueTab(league.key)}
        >
          {league.title}
        </button>
      ))}
    </div>
  );
};
