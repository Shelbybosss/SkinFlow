export const dietRecommendations = {
    acne: {
        title: 'Diet for Acne-Prone Skin',
        icon: '🫧',
        eat: [
            { food: 'Leafy greens (spinach, kale)', benefit: 'Rich in vitamins A and C, reduce inflammation' },
            { food: 'Zinc-rich foods (pumpkin seeds, chickpeas)', benefit: 'Helps regulate oil production' },
            { food: 'Omega-3 foods (flaxseeds, walnuts)', benefit: 'Anti-inflammatory properties' },
            { food: 'Probiotic foods (yogurt, fermented vegetables)', benefit: 'Supports gut health linked to skin' },
            { food: 'Green tea', benefit: 'Antioxidants reduce inflammation' },
            { food: 'Turmeric', benefit: 'Powerful anti-inflammatory spice' }
        ],
        avoid: [
            { food: 'Excess sugar and sweets', reason: 'Spikes insulin, triggers oil production' },
            { food: 'Processed/fried foods', reason: 'Increases inflammation' },
            { food: 'Dairy (for some people)', reason: 'May trigger hormonal acne' },
            { food: 'White bread and refined carbs', reason: 'High glycemic index' }
        ]
    },
    glowing: {
        title: 'Diet for Glowing Skin',
        icon: '✨',
        eat: [
            { food: 'Citrus fruits (oranges, lemons)', benefit: 'Vitamin C boosts collagen' },
            { food: 'Avocado', benefit: 'Healthy fats for moisturized skin' },
            { food: 'Nuts and seeds', benefit: 'Vitamin E protects against damage' },
            { food: 'Berries (blueberries, strawberries)', benefit: 'Antioxidants fight free radicals' },
            { food: 'Sweet potatoes', benefit: 'Beta-carotene for natural glow' },
            { food: 'Tomatoes', benefit: 'Lycopene provides UV protection' }
        ],
        avoid: [
            { food: 'Excessive caffeine', reason: 'Can dehydrate skin' },
            { food: 'Alcohol', reason: 'Dehydrates and causes inflammation' },
            { food: 'Excess salt', reason: 'Causes puffiness and water retention' }
        ]
    },
    dryness: {
        title: 'Diet for Dry Skin',
        icon: '💧',
        eat: [
            { food: 'Fatty fish alternatives (flaxseed oil, chia seeds)', benefit: 'Omega-3 supports skin barrier' },
            { food: 'Avocado', benefit: 'Healthy fats lock in moisture' },
            { food: 'Coconut and olive oil', benefit: 'Nourishes skin from within' },
            { food: 'Cucumbers and watermelon', benefit: 'High water content hydrates' },
            { food: 'Almonds', benefit: 'Vitamin E supports skin moisture' },
            { food: 'Water-rich fruits', benefit: 'Natural hydration' }
        ],
        avoid: [
            { food: 'Caffeine in excess', reason: 'Diuretic that dehydrates' },
            { food: 'Very salty foods', reason: 'Draws moisture from skin' },
            { food: 'Alcohol', reason: 'Causes dehydration' }
        ]
    },
    aging: {
        title: 'Diet for Anti-Aging',
        icon: '🌿',
        eat: [
            { food: 'Dark leafy greens', benefit: 'Vitamins and antioxidants' },
            { food: 'Berries', benefit: 'Powerful antioxidants fight aging' },
            { food: 'Nuts (especially walnuts)', benefit: 'Omega-3 and vitamin E' },
            { food: 'Green tea', benefit: 'Polyphenols protect against UV' },
            { food: 'Olive oil', benefit: 'Healthy fats maintain elasticity' },
            { food: 'Dark chocolate (70%+)', benefit: 'Flavonoids improve skin texture' }
        ],
        avoid: [
            { food: 'Excess sugar', reason: 'Glycation damages collagen' },
            { food: 'Processed meats', reason: 'Sulfites cause inflammation' },
            { food: 'Trans fats', reason: 'Accelerates skin aging' }
        ]
    },
    pigmentation: {
        title: 'Diet for Pigmentation & Dark Spots',
        icon: '🌟',
        eat: [
            { food: 'Vitamin C fruits (amla, guava, kiwi)', benefit: 'Inhibits melanin production' },
            { food: 'Turmeric', benefit: 'Brightening and anti-inflammatory' },
            { food: 'Tomatoes', benefit: 'Lycopene reduces pigmentation' },
            { food: 'Papaya', benefit: 'Enzymes help brighten skin' },
            { food: 'Soy products', benefit: 'Contains isoflavones that reduce spots' },
            { food: 'Green tea', benefit: 'Antioxidants reduce melanin' }
        ],
        avoid: [
            { food: 'Excess coffee', reason: 'Can worsen pigmentation' },
            { food: 'Artificial additives', reason: 'May trigger skin reactions' }
        ]
    }
};

export function getDietForConcern(concern) {
    const mapping = {
        'Acne': 'acne',
        'Pimples': 'acne',
        'Dark spots': 'pigmentation',
        'Pigmentation': 'pigmentation',
        'Dull skin': 'glowing',
        'Dryness': 'dryness',
        'Oiliness': 'acne',
        'Large pores': 'acne',
        'Uneven tone': 'pigmentation'
    };
    const key = mapping[concern] || 'glowing';
    return dietRecommendations[key];
}
