export const getPayoutAcceptedEmailTemplate = (name: string) => {
    const PAYOUT_ACCEPTED_TITLE = "Payout Accepted";
    const PAYOUT_ACCEPTED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your payout request has been accepted and will be processed shortly.</p>`;
    return {
        title: PAYOUT_ACCEPTED_TITLE,
        template: PAYOUT_ACCEPTED_TEMPLATE,
    };
}

export const getPayoutRejectedEmailTemplate = (name: string) => {
    const PAYOUT_REJECTED_TITLE = "Payout Rejected";
    const PAYOUT_REJECTED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your payout request has been rejected. Please contact support for more information.</p>`;
    return {
        title: PAYOUT_REJECTED_TITLE,
        template: PAYOUT_REJECTED_TEMPLATE,
    };
}

export const getPayoutSubmittedEmailTemplate = (name: string) => {
    const PAYOUT_SUBMITTED_TITLE = "Payout Submitted";
    const PAYOUT_SUBMITTED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your payout request has been submitted and is pending approval.</p>`;
    return {
        title: PAYOUT_SUBMITTED_TITLE,
        template: PAYOUT_SUBMITTED_TEMPLATE,
    };
}

export const getAffiliatePayoutAcceptedEmailTemplate = (name: string) => {
    const AFFILIATE_PAYOUT_ACCEPTED_TITLE = "Affiliate Payout Accepted";
    const AFFILIATE_PAYOUT_ACCEPTED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your affiliate payout request has been accepted and will be processed shortly.</p>`;
    return {
        title: AFFILIATE_PAYOUT_ACCEPTED_TITLE,
        template: AFFILIATE_PAYOUT_ACCEPTED_TEMPLATE,
    };
}

export const getAffiliatePayoutRejectedEmailTemplate = (name: string) => {
    const AFFILIATE_PAYOUT_REJECTED_TITLE = "Affiliate Payout Rejected";
    const AFFILIATE_PAYOUT_REJECTED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your affiliate payout request has been rejected. Please contact support for more information.</p>`;
    return {
        title: AFFILIATE_PAYOUT_REJECTED_TITLE,
        template: AFFILIATE_PAYOUT_REJECTED_TEMPLATE,
    };
}

export const getAffiliatePayoutSubmittedEmailTemplate = (name: string) => {
    const AFFILIATE_PAYOUT_SUBMITTED_TITLE = "Affiliate Payout Submitted";
    const AFFILIATE_PAYOUT_SUBMITTED_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Your affiliate payout request has been submitted and is pending approval.</p>`;
    return {
        title: AFFILIATE_PAYOUT_SUBMITTED_TITLE,
        template: AFFILIATE_PAYOUT_SUBMITTED_TEMPLATE,
    };
}