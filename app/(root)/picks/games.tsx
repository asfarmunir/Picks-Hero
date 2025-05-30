"use client";
import { useGetGames } from "@/app/hooks/useGetGames";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ALL_STEP_CHALLENGES } from "@/lib/constants";
import { americanToDecimalOdds, calculateToWin, getOriginalAccountValue } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface GetGamesParams {
  sportKey: string;
  oddsFormat: "decimal" | "american";
  addBet: (bet: Bet) => void;
  bets: Bet[];
  setFeaturedMatch: (match: any) => void;
  account: any;
  tab: string;
  setBets: (bets: Bet[]) => void;
}

interface Bet {
  id: number;
  team: string;
  odds: number;
  pick: number;
  toWin: number;
  oddsFormat: "decimal" | "american";
  home_team: string;
  away_team: string;
  gameDate: string;
  sport: string;
  event: string;
  league: string;
}

const GamesTable = ({ sportKey, oddsFormat, addBet, bets, setBets, setFeaturedMatch, account, tab }: GetGamesParams) => {
  // GAMES DATA
  const {
    data: games,
    isLoading,
    refetch,
  } = useGetGames({
    sportKey: sportKey,
    oddsFormat: oddsFormat,
  });

  useEffect(() => {
    refetch();
  }, [oddsFormat]);
  
  if(games) {
    setFeaturedMatch(games[0]);
  }

  //   BETS DATA
  const [oepnPickModal, setOpenPickModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const [home, setHome] = useState(true);
  // const [pick, setPick] = useState(1);

  const openPickModal = ({ game, home }: { game: any; home: boolean }) => {
    // if bet id is already there, skip
    if (bets.find((b) => b.id === game.id)) {
      toast.error("You have already added this game to your bet slip.");
      return;
    }

    setSelectedTeam(home ? game.home_team : game.away_team);
    setHome(home);
    setSelectedGame(game);
    setOpenPickModal(true);
    return;
  };
  const onClose = () => {
    setOpenPickModal(false);
    setSelectedTeam(null);
    setSelectedGame(null);
  };
  
  const addGameToBetSlip = ({ game, home }: { game: any; home: boolean }) => {
    // e.preventDefault();
    let gameAlreadyInBetSlip = false;
    bets.forEach((bet) => {
      if (bet.id === game.id) {
        gameAlreadyInBetSlip = true;
      }
    });

    // if game exists, remove it
    if (gameAlreadyInBetSlip) {
      setBets(bets.filter((bet) => bet.id !== game.id));
    }

    const odds = home
    ? game.bookmakers[0]?.markets[0]?.outcomes[0].price
    : game.bookmakers[0]?.markets[0]?.outcomes[1].price
    
    const initialPick = getOriginalAccountValue(account) * ALL_STEP_CHALLENGES.minPickAmount;
    const bet: Bet = {
      id: game.id,
      team: home ? game.home_team : game.away_team,
      odds: Number(odds),
      pick: initialPick,
      toWin: oddsFormat === "decimal" ? initialPick * (Number(odds) - 1) : initialPick * (americanToDecimalOdds(Number(odds)) - 1),
      oddsFormat: oddsFormat,
      home_team: game.home_team,
      away_team: game.away_team,
      gameDate: game.commence_time,
      sport: tab,
      league: sportKey,
      event: `${game.home_team} vs ${game.away_team}`,
    };

    
    // if bet id is already there, skip
    if (bets.find((b) => b.id === bet.id)) {
      return;
    }

    addBet(bet);
    onClose();
  };

  const findTeamInBets = (team: string, id: number) => {
    return bets.find((bet) => bet.team === team && bet.id === id);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircle />
      </div>
    );
  }

  if (!games) {
    return (
      <div className="w-full h-full justify-center items-center font-bold text-center">
        <p>Failed to fetch games.</p>
      </div>
    );
  }

  if (!games) {
    return <div className="text-center">No games</div>;
  }

  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className=" bg-[#333547] text-[#848BAC] border-none">
          <TableRow className=" border-none">
            <TableHead className="uppercase  font-bold text-start">
              TIME
            </TableHead>
            <TableHead className="uppercase font-bold text-start">
              TEAM & ODDS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" ">
          {games.map((game: any) => (
            <TableRow key={game.id}>
              <TableCell className=" font-semibold w-[160px] capitalize text-xs py-5 border-b border-gray-700 2xl:text-base text-start truncate">
                {new Date(game.commence_time).toUTCString()}{" "}
              </TableCell>

              <TableCell className=" w-full py-5 border-b border-gray-700 ">
                <div
                  className={`flex w-full cursor-pointer items-center gap-2`}
                >
                  <div
                    onClick={() => addGameToBetSlip({ game, home: true })}
                    className={`  ${
                      findTeamInBets(game.home_team, game.id)
                        ? " border border-primary-50/80 shadow shadow-green-700"
                        : ""
                    }  flex w-full text-start justify-between
                    items-center gap-5 p-3 text-sm  2xl:text-base  bg-[#272837]
                    shadow-inner shadow-gray-600 rounded-lg`}
                  >
                    <p className="flex items-center text-nowrap gap-1">
                      {game.home_team}
                    </p>
                    <span className=" ">
                      {game.bookmakers[0]?.markets[0]?.outcomes[0].price}
                    </span>
                  </div>
                  <p
                    className={`flex justify-center font-bold text-nowrap items-center gap-2 p-3 text-sm   2xl:text-base 
                    bg-[#272837] shadow-inner shadow-gray-600 rounded-lg`}
                  >
                    vs
                  </p>
                  <div
                    onClick={() => addGameToBetSlip({ game, home: false })}
                    className={`${
                      findTeamInBets(game.away_team, game.id)
                        ? " border border-primary-50/80 shadow shadow-green-700"
                        : ""
                    }  flex w-full text-start justify-between
                    items-center gap-5 p-3 text-sm  2xl:text-base  bg-[#272837]
                    shadow-inner shadow-gray-600 rounded-lg`}
                  >
                    <p className="flex items-center text-nowrap gap-1">
                      {game.away_team}
                    </p>

                    <span className=" ">
                      {game.bookmakers[0]?.markets[0]?.outcomes[1].price}
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Dialog open={oepnPickModal} onOpenChange={onClose}>
        <DialogContent className=" bg-primary-100 gap-1 p-5 text-white border-none">
          <form className="space-y-4" >
            <p>Bet on {selectedTeam}</p>
            <div>
              <label htmlFor="pick" className="text-sm">
                Bet
              </label>
              <Input
                id="pick"
                type="number"
                onChange={(e) => setPick(+e.target.value)}
                placeholder="Place your bet"
                className="bg-transparent text-white border border-white border-opacity-10"
              />
            </div>
            <button
              type="submit"
              className=" p-3.5 uppercase font-bold inner-shadow text-xs rounded-lg"
            >
              PLACE bet
            </button>
          </form>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default GamesTable;
