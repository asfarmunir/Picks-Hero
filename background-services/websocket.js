const WebSocket = require("ws");
const { PrismaClient } = require("../node_modules/@prisma/client");
const { getOriginalBalance } = require("./utils");

const prisma = new PrismaClient();

// Function to broadcast data to all connected WebSocket clients
function broadcast(data, wss) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function getNewUserLevel(picksWon) {
  if (picksWon < 10) {
    return "NEWBIE";
  } else if (picksWon < 50) {
    return "BRONZE";
  } else if (picksWon < 100) {
    return "SILVER";
  } else if (picksWon < 200) {
    return "GOLD";
  } else if (picksWon < 350) {
    return "PLATINUM";
  } else {
    return "HERO";
  }
}

// Function to check for match updates and send to clients
async function checkForUpdates(wss) {
  try {
    // Fetch all active bets
    const bets = await prisma.bets.findMany({
      where: {
        betStatus: "OPENED",
      },
    });

    if (!bets.length) {
      console.log("No open bets found.");
      return;
    }

    // Create a map of sportKeys to associated bets
    const groupedBets = bets.reduce((acc, bet) => {
      bet.sportKey.forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({
          bet,
          matchIndex: index, // To keep track of which match in the bet
        });
      });
      return acc;
    }, {});

    // Fetch match results from the third-party API
    const results = await Promise.all(
      Object.keys(groupedBets).map(async (sportKey) => {
        try {
          const response = await fetch(
            `https://api.the-odds-api.com/v4/sports/${sportKey}/scores/?apiKey=${
              process.env.NEXT_PUBLIC_PICKS_API_KEY
            }&daysFrom=3&eventIds=${groupedBets[sportKey]
              .map(({ bet, matchIndex }) => bet.eventId[matchIndex])
              .join(",")}`
          );
          if (!response.ok) {
            console.log(response);
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }
          return response.json();
        } catch (error) {
          console.error(`Error fetching results for sport ${sportKey}:`, error);
          return [];
        }
      })
    );

    // Flatten and filter completed games
    const completedGames = results.flat().filter((game) => game.completed);

    if (completedGames.length > 0) {
      // Broadcast the completed game results to all connected WebSocket clients
      broadcast(completedGames, wss);

      // Iterate over each bet and update accordingly
      bets.forEach(async (bet) => {
        try {
          let allMatchesWon = true; // To track if all matches in the bet are won

          for (let i = 0; i < bet.eventId.length; i++) {
            const game = completedGames.find(
              (game) => game.id === bet.eventId[i]
            );
            if (game) {
              let isHomeTeam = bet.team[i] === game.home_team;
              let matchWon =
                (isHomeTeam &&
                  Number(game.scores[0].score) >
                    Number(game.scores[1].score)) ||
                (!isHomeTeam &&
                  Number(game.scores[0].score) < Number(game.scores[1].score));

              if (!matchWon) {
                allMatchesWon = false; // If any match is lost, mark the entire bet as lost
                break;
              }
            }
          }

          let betResult = allMatchesWon ? "WIN" : "LOSE";

          const account = await prisma.account.findUnique({
            where: { id: bet.accountId },
          });

          // Update the bet in the database
          await prisma.bets.update({
            where: { id: bet.id },
            data: { betResult, betStatus: "CLOSED" },
          });

          // If the bet is won, update the account balance and increment picks won
          if (betResult === "WIN") {
            await prisma.account.update({
              where: { id: bet.accountId },
              data: {
                balance: { increment: bet.pick + bet.winnings },
                totalFundedAmount: {
                  increment: account.status === "FUNDED" ? bet.winnings : 0,
                },
              },
            });
            await prisma.user.update({
              where: {
                id: bet.userId,
              },
              data: {
                picksWon: {
                  increment: 1,
                },
                profileLevel: {
                  set: getNewUserLevel(account.picksWon + 1),
                },
              },
            });
          } else {
            await prisma.account.update({
              where: {
                id: bet.accountId,
              },
              data: {
                totalLoss: { increment: bet.pick },
                dailyLoss: { increment: bet.pick },
                totalFundedAmount: {
                  decrement: account.status === "FUNDED" ? bet.pick : 0,
                },
              },
            });
            if (
              account.dailyLoss + bet.pick >=
              getOriginalBalance(account) * 0.15
            ) {
              await prisma.account.update({
                where: {
                  id: bet.accountId,
                },
                data: {
                  status: "BREACHED",
                },
              });
            }
            if (
              account.totalLoss + bet.pick >=
              getOriginalBalance(account) * 0.2
            ) {
              await prisma.account.update({
                where: {
                  id: bet.accountId,
                },
                data: {
                  status: "BREACHED",
                },
              });
            }
          }
        } catch (error) {
          console.error(`Error processing bet ${bet.id}:`, error);
        }
      });
    } else {
      console.log("No completed games found.");
    }
  } catch (error) {
    console.error("An unexpected error occurred in checkForUpdates:", error);
  }
}

// Initialize WebSocket server with noServer: true
const init = (server) => {
  const wss = new WebSocket.Server({ port: 443 });

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket server");

    // // When a message is received from the client
    ws.on("message", (message) => {
      console.log("Received message:", message);
      ws.send("Server received your message");
    });

    // When the connection is closed
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket server initialized");

  // Periodically check for match updates (every 1 minute)
  setInterval(() => checkForUpdates(wss), 1 * 60 * 1000);
};

module.exports = { init };
