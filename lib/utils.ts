import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALL_STEP_CHALLENGES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToFullCronString(date: Date) {
  const minutes = date.getUTCMinutes(); // Get minutes in UTC
  const hours = date.getUTCHours(); // Get hours in UTC
  const dayOfMonth = date.getUTCDate(); // Get day of the month
  const month = date.getUTCMonth() + 1; // Get month (0-11, so +1)
  const dayOfWeek = "*"; // Can specify a day or use '*' for any

  // If you need a specific year, you'll handle that logic separately
  return `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

export function getOriginalAccountValue(account: any) {
  return parseInt(account.accountSize.replace("K", "000"));
}

export function getPercentageTimePassed(
  startDate: Date | string,
  endDate: Date | string
): number {
  // Convert the input to Date objects if necessary
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);
  const now: Date = new Date();

  // If current time is before the start, return 0 (0% time passed)
  if (now < start) {
    return 0;
  }

  // If current time is after the end, return 100 (100% time passed)
  if (now > end) {
    return 100;
  }

  // Calculate the total duration and time passed (in milliseconds)
  const totalDuration: number = end.getTime() - start.getTime();
  const timePassed: number = now.getTime() - start.getTime();

  // Calculate the percentage of time passed
  const percentagePassed: number = (timePassed / totalDuration) * 100;

  return percentagePassed;
}

export const areStepObjectivesComplete = (account: any) => {
  const accountValue = getOriginalAccountValue(account);

  // Check if the account has made the minimum number of picks
  if (account.picks < ALL_STEP_CHALLENGES.minPicks) {
    return false;
  }

  // Check max daily loss
  if (account.dailyLoss >= accountValue * ALL_STEP_CHALLENGES.maxDailyLoss) {
    return false;
  }

  // Check total loss
  if (account.totalLoss >= accountValue * ALL_STEP_CHALLENGES.maxLoss) {
    return false;
  }

  // Check profit target
  if (account.profit <= accountValue * ALL_STEP_CHALLENGES.profitTarget) {
    return false;
  }

  // Min bet period
  if (account.minBetPeriodCompleted === false) {
    return false;
  }

  // Max bet period automatically handled by the CRON job

  return true;
};

export const checkObjectivesAndUpgrade = async (prisma: any, account: any) => {
  const objectivesComplete = areStepObjectivesComplete(account);

  // If objectives are complete, update account status
  if (objectivesComplete) {
    const oldPhase = account.phase;
    const type: "TWO_STEP" | "THREE_STEP" = account.accountType;

    let newPhase = oldPhase + 1;
    let goFunded = false;

    if (type === "TWO_STEP") {
      if (newPhase === 3) {
        goFunded = true;
      }
    } else if (type === "THREE_STEP") {
      if (newPhase === 4) {
        goFunded = true;
      }
    }

    try {
      await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          phase: newPhase,
          status: goFunded ? "FUNDED" : "CHALLENGE",
        },
      });
    } catch (e) {
      throw new Error(`Error updating account: ${e}`);
    }
  }
};
