const ALL_STEP_CHALLENGES = {
  minPicks: 25,
  minPickAmount: 0.025, // 2.5%
  maxPickAmount: 0.1, // 10%
  maxLoss: 0.2, // 20%
  maxDailyLoss: 0.15, // 15%
  profitTarget: 0.3, // 30%
  minBetPeriod: 7, // 7 days
  maxBetPeriod: 30, // 30 days
};

function getTailoredObjectives(account) {
  const tailoredObjectives = {
    minPicks: 25,
    maxLoss: getOriginalBalance(account) * ALL_STEP_CHALLENGES.maxLoss,
    maxDailyLoss:
      getOriginalBalance(account) * ALL_STEP_CHALLENGES.maxDailyLoss,
    profitTarget:
      getOriginalBalance(account) * ALL_STEP_CHALLENGES.profitTarget,
  };
  return tailoredObjectives;
}

function getOriginalBalance(account) {
  const original_balance = parseInt(account.accountSize.replace("K", "000"));
  return original_balance;
}

function calculateTotalLoss(account) {
  const account_size = getOriginalBalance(account);
  const total_loss = account_size - account.balance;
  if (total_loss < 0) {
    return 0;
  }
  return total_loss;
}

function calculateTotalProfit(account) {
  const account_size = getOriginalBalance(account);
  const total_profit = account.balance - account_size;
  if (total_profit < 0) {
    return 0;
  }
  return total_profit;
}

module.exports = {
  ALL_STEP_CHALLENGES,
  getTailoredObjectives,
  getOriginalBalance,
  calculateTotalLoss,
  calculateTotalProfit,
};
