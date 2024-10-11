export const getWelcomePhase1EmailTemplate = (name: string) => {
    const WELCOME_PHASE1_TITLE = "Welcome to the PicksHero!";
    const WELCOME_PHASE1_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Welcome to <strong>Phase 1</strong>`;
    return {
        title: WELCOME_PHASE1_TITLE,
        template: WELCOME_PHASE1_TEMPLATE,
    };
}

export const getWelcomePhase2EmailTemplate = (name: string) => {
    const WELCOME_PHASE2_TITLE = "Welcome to the PicksHero!";
    const WELCOME_PHASE2_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Welcome to <strong>Phase 2</strong>`;
    return {
        title: WELCOME_PHASE2_TITLE,
        template: WELCOME_PHASE2_TEMPLATE,
    };
}

export const getWelcomePhase3EmailTemplate = (name: string) => {
    const WELCOME_PHASE3_TITLE = "Welcome to the PicksHero!";
    const WELCOME_PHASE3_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>Welcome to <strong>Phase 3</strong>`;
    return {
        title: WELCOME_PHASE3_TITLE,
        template: WELCOME_PHASE3_TEMPLATE,
    };
}