/**
 * Skincare Mistake Detector
 * Analyzes user's routine and habits, returns warnings
 */

const rules = [
    {
        id: 'no-sunscreen',
        severity: 'high',
        check: (routine) => {
            const morningSteps = routine.filter(s => s.routineType === 'morning');
            const hasSunscreen = morningSteps.some(s =>
                s.name.toLowerCase().includes('sunscreen') ||
                s.name.toLowerCase().includes('spf') ||
                s.category === 'sunscreen'
            );
            return !hasSunscreen && morningSteps.length > 0;
        },
        title: 'Missing Sunscreen',
        message: 'Your morning routine is missing sunscreen. SPF protects against UV damage, premature aging, and pigmentation. This is the most important step!',
        icon: '☀️'
    },
    {
        id: 'retinol-acids',
        severity: 'high',
        check: (routine) => {
            const nightSteps = routine.filter(s => s.routineType === 'night');
            const hasRetinol = nightSteps.some(s =>
                s.name.toLowerCase().includes('retinol') || s.name.toLowerCase().includes('retinoid')
            );
            const hasAcids = nightSteps.some(s =>
                s.name.toLowerCase().includes('aha') ||
                s.name.toLowerCase().includes('bha') ||
                s.name.toLowerCase().includes('salicylic') ||
                s.name.toLowerCase().includes('glycolic')
            );
            return hasRetinol && hasAcids;
        },
        title: 'Harsh Combination Detected',
        message: 'Using Retinol with AHA/BHA in the same routine can damage your skin barrier. Use them on alternate nights instead.',
        icon: '⚠️'
    },
    {
        id: 'over-exfoliation',
        severity: 'medium',
        check: (routine) => {
            const exfoliants = routine.filter(s =>
                s.category === 'treatment' || s.category === 'exfoliant' ||
                s.name.toLowerCase().includes('aha') ||
                s.name.toLowerCase().includes('bha') ||
                s.name.toLowerCase().includes('exfol') ||
                s.name.toLowerCase().includes('acid')
            );
            const dailyExfoliants = exfoliants.filter(s => s.frequency === 'Daily');
            return dailyExfoliants.length >= 2;
        },
        title: 'Possible Over-Exfoliation',
        message: 'You have multiple daily exfoliating products. Over-exfoliation can damage your skin barrier, causing irritation and sensitivity. Consider reducing frequency.',
        icon: '🔴'
    },
    {
        id: 'no-moisturizer',
        severity: 'medium',
        check: (routine) => {
            const hasMoisturizer = routine.some(s =>
                s.category === 'moisturizer' ||
                s.name.toLowerCase().includes('moisturizer') ||
                s.name.toLowerCase().includes('cream')
            );
            return !hasMoisturizer && routine.length > 0;
        },
        title: 'Missing Moisturizer',
        message: 'Every skin type needs a moisturizer. Even oily skin benefits from lightweight hydration to maintain a healthy barrier.',
        icon: '💧'
    },
    {
        id: 'vitamin-c-retinol',
        severity: 'medium',
        check: (routine) => {
            const sameRoutineType = ['morning', 'night'];
            return sameRoutineType.some(type => {
                const steps = routine.filter(s => s.routineType === type);
                const hasVitC = steps.some(s => s.name.toLowerCase().includes('vitamin c'));
                const hasRetinol = steps.some(s => s.name.toLowerCase().includes('retinol'));
                return hasVitC && hasRetinol;
            });
        },
        title: 'Vitamin C + Retinol Conflict',
        message: 'Using Vitamin C and Retinol in the same routine can reduce effectiveness and cause irritation. Use Vitamin C in the morning and Retinol at night.',
        icon: '🔄'
    },
    {
        id: 'too-many-actives',
        severity: 'low',
        check: (routine) => {
            const sameRoutineType = ['morning', 'night'];
            return sameRoutineType.some(type => {
                const steps = routine.filter(s => s.routineType === type);
                const actives = steps.filter(s =>
                    s.category === 'serum' || s.category === 'treatment'
                );
                return actives.length >= 4;
            });
        },
        title: 'Too Many Active Products',
        message: 'Having 4 or more active products in one routine may overwhelm your skin. Consider simplifying for better results.',
        icon: '📋'
    }
];

export function detectMistakes(routineSteps) {
    const warnings = [];
    for (const rule of rules) {
        if (rule.check(routineSteps)) {
            warnings.push({
                id: rule.id,
                severity: rule.severity,
                title: rule.title,
                message: rule.message,
                icon: rule.icon
            });
        }
    }
    return warnings;
}
