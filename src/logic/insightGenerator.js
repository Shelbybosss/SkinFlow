/**
 * Insight Generator
 * Analyzes habit data over 7+ days to find correlations
 */

export function generateInsights(habitLogs, skinScores) {
    const insights = [];

    if (!habitLogs || habitLogs.length < 7 || !skinScores || skinScores.length < 7) {
        return [{
            type: 'info',
            icon: '📊',
            text: 'Keep tracking your habits! After 7 days, personalized insights will appear here.'
        }];
    }

    // Correlate water intake with skin score
    const highWaterDays = habitLogs.filter(l => (l.waterGlasses || 0) >= 8);
    const lowWaterDays = habitLogs.filter(l => (l.waterGlasses || 0) < 6);

    if (highWaterDays.length > 0 && lowWaterDays.length > 0) {
        const avgScoreHighWater = getAvgScore(highWaterDays, skinScores);
        const avgScoreLowWater = getAvgScore(lowWaterDays, skinScores);

        if (avgScoreHighWater > avgScoreLowWater + 5) {
            insights.push({
                type: 'positive',
                icon: '💧',
                text: `Your skin score is ${Math.round(avgScoreHighWater - avgScoreLowWater)} points higher on days you drink 8+ glasses of water. Keep it up!`
            });
        }
    }

    // Correlate sleep with skin score
    const goodSleepDays = habitLogs.filter(l => (l.sleepHours || 0) >= 7);
    const poorSleepDays = habitLogs.filter(l => (l.sleepHours || 0) < 6);

    if (goodSleepDays.length > 0 && poorSleepDays.length > 0) {
        const avgScoreGoodSleep = getAvgScore(goodSleepDays, skinScores);
        const avgScorePoorSleep = getAvgScore(poorSleepDays, skinScores);

        if (avgScoreGoodSleep > avgScorePoorSleep + 5) {
            insights.push({
                type: 'positive',
                icon: '😴',
                text: `Sleeping 7+ hours improves your skin score by about ${Math.round(avgScoreGoodSleep - avgScorePoorSleep)} points. Prioritize your beauty sleep!`
            });
        }
    }

    // Check junk food correlation
    const lowJunkDays = habitLogs.filter(l => (l.junkFood || 0) === 0);
    const highJunkDays = habitLogs.filter(l => (l.junkFood || 0) >= 2);

    if (lowJunkDays.length > 0 && highJunkDays.length > 0) {
        const avgScoreLowJunk = getAvgScore(lowJunkDays, skinScores);
        const avgScoreHighJunk = getAvgScore(highJunkDays, skinScores);

        if (avgScoreLowJunk > avgScoreHighJunk + 3) {
            insights.push({
                type: 'warning',
                icon: '🍔',
                text: `Days with less junk food correlate with ${Math.round(avgScoreLowJunk - avgScoreHighJunk)} points higher skin scores. Try to reduce processed food intake.`
            });
        }
    }

    // Consistency insight
    const completedDays = habitLogs.filter(l => l.routineCompleted);
    if (completedDays.length >= habitLogs.length * 0.7) {
        insights.push({
            type: 'positive',
            icon: '⭐',
            text: `You've been consistent with your routine ${Math.round(completedDays.length / habitLogs.length * 100)}% of the time. Consistency is the key to great skin!`
        });
    }

    // Sun exposure insight
    const highSunDays = habitLogs.filter(l => (l.sunExposure || 0) > 60);
    if (highSunDays.length > habitLogs.length * 0.3) {
        insights.push({
            type: 'warning',
            icon: '☀️',
            text: 'You have frequent high sun exposure days. Remember to reapply sunscreen every 2 hours when outdoors.'
        });
    }

    // Fruit/veggie insight
    const goodDietDays = habitLogs.filter(l => (l.fruits || 0) + (l.vegetables || 0) >= 3);
    if (goodDietDays.length >= habitLogs.length * 0.5) {
        insights.push({
            type: 'positive',
            icon: '🥗',
            text: 'Your fruit and vegetable intake has been great! This nutritious diet supports healthy, glowing skin.'
        });
    }

    if (insights.length === 0) {
        insights.push({
            type: 'info',
            icon: '📈',
            text: 'Keep tracking consistently to reveal more patterns. The more data, the better the insights!'
        });
    }

    return insights;
}

function getAvgScore(filteredLogs, skinScores) {
    const dates = new Set(filteredLogs.map(l => l.date));
    const matchingScores = skinScores.filter(s => dates.has(s.date));
    if (matchingScores.length === 0) return 0;
    return matchingScores.reduce((sum, s) => sum + s.score, 0) / matchingScores.length;
}
