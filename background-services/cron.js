const cron = require('node-cron');
const { PrismaClient } = require('../node_modules/@prisma/client');
const prisma = new PrismaClient();

// Initialize CRON jobs
const init = () => {
  // Schedule the CRON job to run at 6 AM UTC every day
  cron.schedule('0 6 * * *', async () => {
    try {
      console.log('Resetting dailyLoss at 6AM UTC');
      await prisma.account.updateMany({
        data: { dailyLoss: 0 },
      });
      console.log('dailyLoss reset successful');
    } catch (error) {
      console.error('Error resetting dailyLoss:', error);
    }
  }, {
    timezone: 'UTC',
  });
};

module.exports = { init };
