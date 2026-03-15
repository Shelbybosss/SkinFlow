const routineTemplates = {
    Oily: {
        morning: [
            { name: 'Foaming Cleanser', description: 'Remove excess oil and impurities', category: 'cleanser' },
            { name: 'Niacinamide Serum', description: 'Controls oil and minimizes pores', category: 'serum' },
            { name: 'Oil-Free Moisturizer', description: 'Lightweight hydration without greasiness', category: 'moisturizer' },
            { name: 'Sunscreen SPF 30+', description: 'Protect from UV damage', category: 'sunscreen' }
        ],
        night: [
            { name: 'Foaming Cleanser', description: 'Deep cleanse end-of-day buildup', category: 'cleanser' },
            { name: 'Salicylic Acid Serum', description: 'Unclogs pores and fights acne', category: 'treatment', frequency: '3x per week' },
            { name: 'Lightweight Moisturizer', description: 'Repair and hydrate overnight', category: 'moisturizer' }
        ]
    },
    Dry: {
        morning: [
            { name: 'Gentle Cream Cleanser', description: 'Cleanses without stripping moisture', category: 'cleanser' },
            { name: 'Hyaluronic Acid Serum', description: 'Draws moisture into the skin', category: 'serum' },
            { name: 'Rich Moisturizer', description: 'Deep hydration and barrier support', category: 'moisturizer' },
            { name: 'Sunscreen SPF 30+', description: 'Protect from UV damage', category: 'sunscreen' }
        ],
        night: [
            { name: 'Gentle Cream Cleanser', description: 'Mild cleanse before bed', category: 'cleanser' },
            { name: 'Hydrating Serum', description: 'Replenish moisture levels', category: 'serum' },
            { name: 'Night Cream / Rich Moisturizer', description: 'Lock in moisture overnight', category: 'moisturizer' }
        ]
    },
    Combination: {
        morning: [
            { name: 'Gel Cleanser', description: 'Balances oily and dry areas', category: 'cleanser' },
            { name: 'Niacinamide Serum', description: 'Balances oil and hydrates', category: 'serum' },
            { name: 'Lightweight Moisturizer', description: 'Hydrate without heaviness', category: 'moisturizer' },
            { name: 'Sunscreen SPF 30+', description: 'Protect from UV damage', category: 'sunscreen' }
        ],
        night: [
            { name: 'Gel Cleanser', description: 'Evening cleanse', category: 'cleanser' },
            { name: 'AHA/BHA Exfoliant', description: 'Smooth texture and clear pores', category: 'treatment', frequency: '2x per week' },
            { name: 'Moisturizer', description: 'Overnight hydration', category: 'moisturizer' }
        ]
    },
    Sensitive: {
        morning: [
            { name: 'Micellar Water / Gentle Cleanser', description: 'Ultra-gentle cleansing', category: 'cleanser' },
            { name: 'Centella Asiatica Serum', description: 'Soothes and calms skin', category: 'serum' },
            { name: 'Fragrance-Free Moisturizer', description: 'Gentle hydration', category: 'moisturizer' },
            { name: 'Mineral Sunscreen SPF 30+', description: 'Gentle UV protection', category: 'sunscreen' }
        ],
        night: [
            { name: 'Gentle Cleanser', description: 'Soft cleansing before bed', category: 'cleanser' },
            { name: 'Ceramide Serum', description: 'Strengthens skin barrier', category: 'serum' },
            { name: 'Soothing Night Cream', description: 'Repair and calm overnight', category: 'moisturizer' }
        ]
    },
    Normal: {
        morning: [
            { name: 'Gentle Cleanser', description: 'Start with a fresh face', category: 'cleanser' },
            { name: 'Vitamin C Serum', description: 'Antioxidant protection and brightness', category: 'serum' },
            { name: 'Moisturizer', description: 'Balanced hydration', category: 'moisturizer' },
            { name: 'Sunscreen SPF 30+', description: 'Protect from UV damage', category: 'sunscreen' }
        ],
        night: [
            { name: 'Gentle Cleanser', description: 'Remove the day', category: 'cleanser' },
            { name: 'Retinol Serum', description: 'Anti-aging and skin renewal', category: 'treatment', frequency: '2x per week' },
            { name: 'Moisturizer', description: 'Overnight nourishment', category: 'moisturizer' }
        ]
    }
};

const concernAddons = {
    'Acne': [
        { name: 'Benzoyl Peroxide Spot Treatment', description: 'Target active breakouts', category: 'treatment', routineType: 'night', frequency: 'As needed' }
    ],
    'Pimples': [
        { name: 'Tea Tree Oil Spot Treatment', description: 'Natural antibacterial for blemishes', category: 'treatment', routineType: 'night', frequency: 'As needed' }
    ],
    'Dark spots': [
        { name: 'Vitamin C Serum', description: 'Brightens and fades spots', category: 'serum', routineType: 'morning' },
        { name: 'Alpha Arbutin Serum', description: 'Targets hyperpigmentation', category: 'serum', routineType: 'night' }
    ],
    'Pigmentation': [
        { name: 'Vitamin C Serum', description: 'Brightens and evens tone', category: 'serum', routineType: 'morning' },
        { name: 'Azelaic Acid', description: 'Fades pigmentation marks', category: 'treatment', routineType: 'night', frequency: '3x per week' }
    ],
    'Dull skin': [
        { name: 'Vitamin C Serum', description: 'Revives dull complexion', category: 'serum', routineType: 'morning' },
        { name: 'AHA Exfoliant', description: 'Reveals brighter skin underneath', category: 'treatment', routineType: 'night', frequency: '2x per week' }
    ],
    'Dryness': [
        { name: 'Hyaluronic Acid Serum', description: 'Intense hydration boost', category: 'serum', routineType: 'morning' },
        { name: 'Facial Oil (Squalane)', description: 'Seals in moisture', category: 'oil', routineType: 'night' }
    ],
    'Oiliness': [
        { name: 'Niacinamide Serum', description: 'Controls excess oil', category: 'serum', routineType: 'morning' }
    ],
    'Large pores': [
        { name: 'Niacinamide Serum', description: 'Minimizes pore appearance', category: 'serum', routineType: 'morning' },
        { name: 'BHA Exfoliant', description: 'Deep cleans pores', category: 'treatment', routineType: 'night', frequency: '2x per week' }
    ],
    'Uneven tone': [
        { name: 'Vitamin C Serum', description: 'Evens and brightens tone', category: 'serum', routineType: 'morning' },
        { name: 'AHA Exfoliant', description: 'Promotes even cell turnover', category: 'treatment', routineType: 'night', frequency: '2x per week' }
    ]
};

export function generateRoutine(skinType, concerns = []) {
    const base = routineTemplates[skinType] || routineTemplates['Normal'];

    const morning = base.morning.map((step, i) => ({
        ...step,
        id: `morning-${i}`,
        routineType: 'morning',
        stepOrder: i,
        isCustom: false,
        frequency: step.frequency || 'Daily'
    }));

    const night = base.night.map((step, i) => ({
        ...step,
        id: `night-${i}`,
        routineType: 'night',
        stepOrder: i,
        isCustom: false,
        frequency: step.frequency || 'Daily'
    }));

    // Add concern-specific products (avoiding duplicates by category+routineType)
    const existingMorning = new Set(morning.map(s => s.category));
    const existingNight = new Set(night.map(s => s.category));

    concerns.forEach(concern => {
        const addons = concernAddons[concern] || [];
        addons.forEach(addon => {
            const targetList = addon.routineType === 'morning' ? morning : night;
            const existingSet = addon.routineType === 'morning' ? existingMorning : existingNight;

            if (!existingSet.has(addon.category)) {
                const insertIndex = targetList.length - 1; // before moisturizer
                targetList.splice(insertIndex, 0, {
                    ...addon,
                    id: `${addon.routineType}-addon-${targetList.length}`,
                    stepOrder: insertIndex,
                    isCustom: false,
                    frequency: addon.frequency || 'Daily'
                });
                existingSet.add(addon.category);
            }
        });
    });

    // Re-index step orders
    morning.forEach((step, i) => { step.stepOrder = i; step.id = `morning-${i}`; });
    night.forEach((step, i) => { step.stepOrder = i; step.id = `night-${i}`; });

    return { morning, night };
}
