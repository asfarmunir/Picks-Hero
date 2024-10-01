const WebSocket = require("ws");
const { PrismaClient } = require("../node_modules/@prisma/client");

const prisma = new PrismaClient();

// Function to broadcast data to all connected WebSocket clients
function broadcast(data, wss) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
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

    // Group bets by sportKey
    const groupedBets = bets.reduce((acc, bet) => {
      if (!acc[bet.sportKey]) {
        acc[bet.sportKey] = [];
      }
      acc[bet.sportKey].push(bet);
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
              .map((bet) => bet.eventId)
              .join(",")}`
          );
          if (!response.ok) {
            console.log(response)
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

    // Filter completed games
    const completedGames = results.flat().filter((game) => game.completed);

    if (completedGames.length > 0) {
      // Broadcast the completed game results to all connected WebSocket clients
      broadcast(completedGames, wss);

      // Update the database with the completed results
      bets.forEach(async (bet) => {
        try {
          const game = completedGames.find((game) => game.id === bet.eventId);
          if (game) {
            let isHomeTeam = bet.team === game.home_team;
            let betResult =
              (isHomeTeam &&
                Number(game.scores[0].score) > Number(game.scores[1].score)) ||
              (!isHomeTeam &&
                Number(game.scores[0].score) < Number(game.scores[1].score))
                ? "WIN"
                : "LOSE";

            await prisma.bets.update({
              where: { id: bet.id },
              data: { betResult, betStatus: "CLOSED" },
            });

            if (betResult === "WIN") {
              await prisma.account.update({
                where: { id: bet.accountId },
                data: {
                  balance: { increment: bet.pick + bet.winnings },
                },
              });
              await prisma.user.update({
                where: {
                    id: bet.userId
                },
                data: {
                    picksWon:{
                        increment: 1
                    }
                }
              })
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
