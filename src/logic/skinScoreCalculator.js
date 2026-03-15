/**
 * Calculates daily skin score (0-100)
 * 
 * Breakdown:
 * - Routine completion: 40 points
 * - Water intake: 20 points
 * - Sleep hours: 20 points
 * - Diet quality: 20 points
 */
export function calculateSkinScore({ routineCompletion = 0, waterGlasses = 0, sleepHours = 0, dietScore = 0 }) {
    // Routine completion (0–100% of total steps) → 40 points
    const routinePoints = Math.min(routineCompletion, 1) * 40;

    // Water intake (target 8 glasses) → 20 points
    const waterPoints = Math.min(waterGlasses / 8, 1) * 20;

    // Sleep hours (target 7-9 hours) → 20 points
    let sleepPoints = 0;
    if (sleepHours >= 7 && sleepHours <= 9) {
        sleepPoints = 20;
    } else if (sleepHours >= 6) {
        sleepPoints = 15;
    } else if (sleepHours >= 5) {
        sleepPoints = 10;
    } else if (sleepHours >= 4) {
        sleepPoints = 5;
    }

    // Diet score (0–100) → 20 points
    const dietPoints = Math.min(dietScore / 100, 1) * 20;

    const total = Math.round(routinePoints + waterPoints + sleepPoints + dietPoints);
    return Math.min(total, 100);
}

/**
 * Calculate diet score from tracked diet data
 * fruits + vegs intake boosts score, junk food reduces it
 */
export function calculateDietScore({ fruits = 0, vegetables = 0, junkFood = 0 }) {
    let score = 50; // base score

    // Fruits: +10 per serving, max +25
    score += Math.min(fruits * 10, 25);

    // Vegetables: +10 per serving, max +25
    score += Math.min(vegetables * 10, 25);

    // Junk food: -15 per serving
    score -= junkFood * 15;

    return Math.max(0, Math.min(100, score));
}

/**
 * Get a label and color for a skin score
 */
export function getScoreLabel(score) {
    if (score >= 90) return { label: 'Excellent', color: '#4CAF50', emoji: '🌟' };
    if (score >= 75) return { label: 'Great', color: '#8BB89E', emoji: '😊' };
    if (score >= 60) return { label: 'Good', color: '#FFC107', emoji: '👍' };
    if (score >= 40) return { label: 'Fair', color: '#FF9800', emoji: '😐' };
    return { label: 'Needs Work', color: '#F44336', emoji: '💪' };
}
