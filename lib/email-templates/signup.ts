export const getSignupEmailTemplate = (name: string) => {
  const SIGNUP_TITLE = "Welcome to the PicksHero!";
  const SIGNUP_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Thank you for signing up to <strong>PicksHero</strong>. We're excited to have you on board!</p>`;
  return {
    title: SIGNUP_TITLE,
    template: SIGNUP_TEMPLATE,
  };
};
