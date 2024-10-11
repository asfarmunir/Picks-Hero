export const getAffiliateSaleEmailTemplate = (name: string, amount: string) => {
  const AFFILIATE_SALE_TITLE = "Welcome to the PicksHero!";
  const AFFILIATE_SALE_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>You have earned <strong>${amount}</strong> from your affiliate sale`;
  return {
    title: AFFILIATE_SALE_TITLE,
    template: AFFILIATE_SALE_TEMPLATE,
  };
};
