export const achievementDefinitions = [
    {
        id: 'first-routine',
        name: 'First Step',
        description: 'Completed your first skincare routine',
        icon: '🌱',
        condition: (stats) => stats.totalRoutinesCompleted >= 1
    },
    {
        id: 'streak-3',
        name: 'Getting Started',
        description: '3-day streak of completing routines',
        icon: '🔥',
        condition: (stats) => stats.currentStreak >= 3
    },
    {
        id: 'streak-7',
        name: 'One Week Strong',
        description: '7-day streak of completing routines',
        icon: '⭐',
        condition: (stats) => stats.currentStreak >= 7
    },
    {
        id: 'streak-14',
        name: 'Consistency Queen',
        description: '14-day streak of completing routines',
        icon: '👑',
        condition: (stats) => stats.currentStreak >= 14
    },
    {
        id: 'streak-30',
        name: 'Routine Master',
        description: '30-day streak of completing routines',
        icon: '🏆',
        condition: (stats) => stats.currentStreak >= 30
    },
    {
        id: 'hydration-hero',
        name: 'Hydration Hero',
        description: 'Met water goal for 7 days straight',
        icon: '💧',
        condition: (stats) => stats.waterGoalStreak >= 7
    },
    {
        id: 'hydration-master',
        name: 'Water Champion',
        description: 'Met water goal for 30 days straight',
        icon: '🌊',
        condition: (stats) => stats.waterGoalStreak >= 30
    },
    {
        id: 'sleep-champion',
        name: 'Beauty Sleep',
        description: 'Logged 7+ hours of sleep for 7 days',
        icon: '😴',
        condition: (stats) => stats.goodSleepStreak >= 7
    },
    {
        id: 'skincare-scholar',
        name: 'Skincare Scholar',
        description: 'Read 5 articles in the Learn section',
        icon: '📚',
        condition: (stats) => stats.articlesRead >= 5
    },
    {
        id: 'ingredient-explorer',
        name: 'Ingredient Explorer',
        description: 'Checked 10 different ingredients',
        icon: '🔍',
        condition: (stats) => stats.ingredientsChecked >= 10
    },
    {
        id: 'photo-tracker',
        name: 'Progress Tracker',
        description: 'Took your first progress photo',
        icon: '📸',
        condition: (stats) => stats.photosTaken >= 1
    },
    {
        id: 'photo-streak',
        name: 'Visual Journey',
        description: 'Took 4 weekly progress photos',
        icon: '🖼️',
        condition: (stats) => stats.photosTaken >= 4
    },
    {
        id: 'perfect-day',
        name: 'Perfect Day',
        description: 'Scored 90+ on the daily skin score',
        icon: '💎',
        condition: (stats) => stats.highestScore >= 90
    },
    {
        id: 'healthy-eater',
        name: 'Healthy Eater',
        description: 'Logged healthy diet for 7 days straight',
        icon: '🥗',
        condition: (stats) => stats.healthyDietStreak >= 7
    },
    {
        id: 'sun-safe',
        name: 'Sun Safe',
        description: 'Applied sunscreen daily for 14 days',
        icon: '🧴',
        condition: (stats) => stats.sunscreenStreak >= 14
    }
];

export function checkAchievements(stats, unlockedIds = []) {
    const newlyUnlocked = [];
    for (const achievement of achievementDefinitions) {
        if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
            newlyUnlocked.push(achievement);
        }
    }
    return newlyUnlocked;
}

export function getAchievementById(id) {
    return achievementDefinitions.find(a => a.id === id);
}
