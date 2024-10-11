export const getResetPasswordEmailTemplate = (resetLink: string) => {
  const RESET_PASSWORD_TITLE = "Welcome to the PicksHero!";
  const RESET_PASSWORD_TEMPLATE = `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`;
  return {
    title: RESET_PASSWORD_TITLE,
    template: RESET_PASSWORD_TEMPLATE,
  };
};
