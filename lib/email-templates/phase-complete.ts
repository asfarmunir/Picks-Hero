export const getPhaseCompleteEmailTemplate = (name: string, phase: string) => {
    const PHASE_COMPLETE_TITLE = "Welcome to the PicksHero!";
    const PHASE_COMPLETE_TEMPLATE = `<p>Hello <strong>${name}</strong>,</p><p>You have completed the <strong>${phase}</strong> phase`;
    return {
        title: PHASE_COMPLETE_TITLE,
        template: PHASE_COMPLETE_TEMPLATE,
    };
}