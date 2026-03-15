import Dexie from 'dexie';

const db = new Dexie('SkinFlowDB');

db.version(1).stores({
    profile: '++id, skinType, createdAt',
    routineSteps: '++id, routineType, stepOrder, isCustom, frequency',
    routineCompletions: '++id, date, routineType, stepId',
    habitLogs: '++id, date',
    progressPhotos: '++id, date',
    achievements: '++id, achievementId, unlockedAt',
    skinScores: '++id, date, score'
});

export default db;
