export const getFundedEmailTemplate = (name: string, accountNumber: string) => {
  const FUNDED_TITLE = "Your account is now Funded!";
  const FUNDED_TEMPLATE = `<p>Congratulations <strong>${name}!</strong>,</p><p>Your account #${accountNumber} has been <strong>Funded</strong>`;
  return {
    title: FUNDED_TITLE,
    template: FUNDED_TEMPLATE,
  };
};

export const getBreachedEmailTemplate = (name:string, accountNumber: string) => {
  const BREACHED_TITLE = "Your account has been Breached!";
  const BREACHED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your account #${accountNumber} has been <strong>Breached</strong>`;
  return {
    title: BREACHED_TITLE,
    template: BREACHED_TEMPLATE,
  };
};