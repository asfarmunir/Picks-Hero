export const getPickWonEmailTemplate = (name: string, accountNumber: string) => {
    const PICK_WON_TITLE = "Picks Hero - Pick Won";
    const PICK_WON_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your pick has been <strong>Won</strong> on account ${accountNumber}`;

    return {
        title: PICK_WON_TITLE,
        template: PICK_WON_TEMPLATE,
    };
}