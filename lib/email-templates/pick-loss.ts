export const getPickLossEmailTemplate = (name: string, accountNumber: string) => {
    const PICK_LOSS_TITLE = "Picks Hero - Pick Loss";
    const PICK_LOSS_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your pick has been <strong>Lost</strong> on account ${accountNumber}`;

    return {
        title: PICK_LOSS_TITLE,
        template: PICK_LOSS_TEMPLATE,
    };
}