export const ingredients = [
    {
        id: 'niacinamide',
        name: 'Niacinamide',
        aka: 'Vitamin B3',
        description: 'A versatile ingredient that helps regulate oil production, minimize pores, and strengthen the skin barrier. Well-tolerated by most skin types.',
        benefits: ['Reduces oil production', 'Minimizes pores', 'Strengthens skin barrier', 'Evens out skin tone', 'Reduces inflammation'],
        bestFor: ['Oily', 'Combination', 'Acne-prone', 'Sensitive'],
        frequency: 'Twice daily (AM and PM)',
        sideEffects: ['Rare — mild redness in very sensitive skin at high concentrations'],
        avoidMixingWith: ['Pure Vitamin C (L-Ascorbic Acid) at the same time'],
        category: 'Vitamin'
    },
    {
        id: 'retinol',
        name: 'Retinol',
        aka: 'Vitamin A derivative',
        description: 'A powerful anti-aging ingredient that boosts cell turnover, stimulates collagen, and helps with acne and hyperpigmentation. Start slowly to avoid irritation.',
        benefits: ['Reduces fine lines', 'Boosts collagen production', 'Improves skin texture', 'Helps with acne', 'Fades dark spots'],
        bestFor: ['Aging skin', 'Acne-prone', 'Uneven texture', 'Hyperpigmentation'],
        frequency: '2–3x per week at night (build up gradually)',
        sideEffects: ['Dryness', 'Peeling', 'Sun sensitivity', 'Irritation when starting'],
        avoidMixingWith: ['AHA/BHA acids', 'Benzoyl Peroxide', 'Vitamin C'],
        category: 'Retinoid'
    },
    {
        id: 'salicylic-acid',
        name: 'Salicylic Acid',
        aka: 'BHA (Beta Hydroxy Acid)',
        description: 'An oil-soluble exfoliant that penetrates pores to clear out buildup, making it excellent for acne-prone and oily skin.',
        benefits: ['Unclogs pores', 'Reduces blackheads', 'Controls excess oil', 'Anti-inflammatory', 'Smooths skin texture'],
        bestFor: ['Oily', 'Acne-prone', 'Blackheads', 'Large pores'],
        frequency: '2–3x per week',
        sideEffects: ['Dryness', 'Mild stinging', 'Increased sun sensitivity'],
        avoidMixingWith: ['Retinol (same routine)', 'Other strong exfoliants'],
        category: 'Exfoliant'
    },
    {
        id: 'hyaluronic-acid',
        name: 'Hyaluronic Acid',
        aka: 'HA, Sodium Hyaluronate',
        description: 'A powerful humectant that can hold up to 1000x its weight in water. Draws moisture into the skin for plump, hydrated complexion.',
        benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines', 'Suitable for all skin types', 'Non-comedogenic'],
        bestFor: ['Dry', 'Normal', 'Combination', 'Sensitive', 'All skin types'],
        frequency: 'Twice daily (AM and PM)',
        sideEffects: ['Rare — may feel tight in very dry environments without a moisturizer on top'],
        avoidMixingWith: ['None — compatible with most ingredients'],
        category: 'Humectant'
    },
    {
        id: 'vitamin-c',
        name: 'Vitamin C',
        aka: 'L-Ascorbic Acid, Ascorbyl Glucoside',
        description: 'A potent antioxidant that brightens skin, fades dark spots, protects against free radical damage, and boosts collagen production.',
        benefits: ['Brightens complexion', 'Fades dark spots', 'Antioxidant protection', 'Boosts collagen', 'Evens skin tone'],
        bestFor: ['Dull skin', 'Hyperpigmentation', 'Aging skin', 'Uneven tone'],
        frequency: 'Once daily in the morning',
        sideEffects: ['Tingling in sensitive skin', 'Can oxidize and become less effective'],
        avoidMixingWith: ['Niacinamide (if using pure L-Ascorbic Acid)', 'Retinol', 'AHA/BHA'],
        category: 'Antioxidant'
    },
    {
        id: 'aha',
        name: 'AHA (Alpha Hydroxy Acid)',
        aka: 'Glycolic Acid, Lactic Acid, Mandelic Acid',
        description: 'Water-soluble exfoliants that work on the skin surface to remove dead skin cells, improve texture, and reveal brighter skin.',
        benefits: ['Exfoliates dead skin', 'Brightens complexion', 'Improves texture', 'Reduces fine lines', 'Helps with pigmentation'],
        bestFor: ['Dry', 'Dull skin', 'Hyperpigmentation', 'Aging skin'],
        frequency: '2–3x per week',
        sideEffects: ['Increased sun sensitivity', 'Redness', 'Peeling'],
        avoidMixingWith: ['Retinol', 'Vitamin C', 'Other exfoliants'],
        category: 'Exfoliant'
    },
    {
        id: 'bha',
        name: 'BHA (Beta Hydroxy Acid)',
        aka: 'Salicylic Acid',
        description: 'Oil-soluble exfoliant that penetrates deeply into pores. Ideal for oily and acne-prone skin types.',
        benefits: ['Deep pore cleansing', 'Reduces acne', 'Controls oil', 'Anti-inflammatory', 'Smooths skin'],
        bestFor: ['Oily', 'Acne-prone', 'Combination'],
        frequency: '2–3x per week',
        sideEffects: ['Dryness', 'Mild irritation', 'Sun sensitivity'],
        avoidMixingWith: ['Retinol', 'AHA (same routine)', 'Vitamin C'],
        category: 'Exfoliant'
    },
    {
        id: 'ceramides',
        name: 'Ceramides',
        aka: 'Ceramide NP, Ceramide AP, Ceramide EOP',
        description: 'Lipids (fats) that make up over 50% of the skin barrier. They help lock in moisture and protect against environmental damage.',
        benefits: ['Strengthens skin barrier', 'Locks in moisture', 'Reduces irritation', 'Soothes sensitive skin', 'Prevents water loss'],
        bestFor: ['Dry', 'Sensitive', 'Eczema-prone', 'Barrier-damaged skin'],
        frequency: 'Twice daily (AM and PM)',
        sideEffects: ['None — extremely well-tolerated'],
        avoidMixingWith: ['None — compatible with all ingredients'],
        category: 'Lipid'
    },
    {
        id: 'benzoyl-peroxide',
        name: 'Benzoyl Peroxide',
        aka: 'BP, BPO',
        description: 'An antibacterial agent that kills acne-causing bacteria and helps clear breakouts. Available in different strengths.',
        benefits: ['Kills acne bacteria', 'Clears breakouts', 'Prevents new acne', 'Reduces inflammation'],
        bestFor: ['Acne-prone', 'Oily'],
        frequency: 'Once daily or as spot treatment',
        sideEffects: ['Dryness', 'Peeling', 'Bleaches fabrics', 'Irritation'],
        avoidMixingWith: ['Retinol', 'Vitamin C', 'AHA/BHA'],
        category: 'Antibacterial'
    },
    {
        id: 'zinc',
        name: 'Zinc',
        aka: 'Zinc Oxide, Zinc PCA',
        description: 'A mineral that helps control oil production, soothes inflammation, and provides sun protection in mineral sunscreens.',
        benefits: ['Controls oil', 'Anti-inflammatory', 'Soothes irritation', 'UV protection (zinc oxide)', 'Supports healing'],
        bestFor: ['Oily', 'Acne-prone', 'Sensitive', 'Rosacea-prone'],
        frequency: 'Daily (in moisturizer or sunscreen)',
        sideEffects: ['May leave white cast (zinc oxide)', 'Can be drying at high percentages'],
        avoidMixingWith: ['None significant'],
        category: 'Mineral'
    },
    {
        id: 'azelaic-acid',
        name: 'Azelaic Acid',
        aka: 'Dicarboxylic Acid',
        description: 'A gentle multi-tasker that treats acne, reduces redness, and fades post-acne marks. Safe during pregnancy.',
        benefits: ['Reduces acne', 'Fades hyperpigmentation', 'Anti-inflammatory', 'Reduces redness', 'Safe for sensitive skin'],
        bestFor: ['Acne-prone', 'Rosacea', 'Hyperpigmentation', 'Sensitive'],
        frequency: 'Twice daily',
        sideEffects: ['Mild tingling', 'Temporary stinging on application'],
        avoidMixingWith: ['None significant — pairs well with most ingredients'],
        category: 'Acid'
    },
    {
        id: 'tea-tree-oil',
        name: 'Tea Tree Oil',
        aka: 'Melaleuca Alternifolia Leaf Oil',
        description: 'A natural antibacterial and anti-inflammatory ingredient. Use diluted — never apply pure tea tree oil directly to skin.',
        benefits: ['Antibacterial', 'Reduces acne', 'Anti-inflammatory', 'Natural antiseptic'],
        bestFor: ['Acne-prone', 'Oily'],
        frequency: 'Daily (diluted in serum or moisturizer)',
        sideEffects: ['Irritation if used undiluted', 'Allergic reactions possible', 'Drying'],
        avoidMixingWith: ['Retinol', 'Strong acids (AHA/BHA)'],
        category: 'Natural'
    },
    {
        id: 'centella-asiatica',
        name: 'Centella Asiatica',
        aka: 'Cica, Madecassoside, Tiger Grass',
        description: 'A soothing plant extract that calms irritation, supports barrier repair, and promotes wound healing.',
        benefits: ['Soothes irritation', 'Supports barrier repair', 'Anti-inflammatory', 'Promotes healing', 'Calms redness'],
        bestFor: ['Sensitive', 'Irritated', 'Barrier-damaged', 'Acne-scarring'],
        frequency: 'Twice daily',
        sideEffects: ['Rare — extremely gentle'],
        avoidMixingWith: ['None — compatible with all ingredients'],
        category: 'Botanical'
    },
    {
        id: 'peptides',
        name: 'Peptides',
        aka: 'Copper Peptides, Matrixyl',
        description: 'Short chains of amino acids that signal the skin to produce more collagen and elastin, helping with anti-aging.',
        benefits: ['Boosts collagen', 'Firms skin', 'Reduces wrinkles', 'Improves elasticity', 'Supports skin repair'],
        bestFor: ['Aging skin', 'Fine lines', 'Loss of firmness'],
        frequency: 'Twice daily',
        sideEffects: ['Rare — very well-tolerated'],
        avoidMixingWith: ['Direct acids (AHA/BHA) at the same time', 'Copper peptides avoid Vitamin C'],
        category: 'Amino Acid'
    },
    {
        id: 'squalane',
        name: 'Squalane',
        aka: 'Hydrogenated Squalene',
        description: 'A lightweight, stable oil that mimics natural skin sebum. Deeply moisturizing without clogging pores.',
        benefits: ['Lightweight hydration', 'Non-comedogenic', 'Strengthens barrier', 'Softens skin', 'Reduces water loss'],
        bestFor: ['Dry', 'Sensitive', 'Oily', 'All skin types'],
        frequency: 'Twice daily (as last step or mixed with moisturizer)',
        sideEffects: ['None — universally well-tolerated'],
        avoidMixingWith: ['None — pairs well with everything'],
        category: 'Oil'
    }
];

export function searchIngredients(query) {
    const q = query.toLowerCase().trim();
    if (!q) return ingredients;
    return ingredients.filter(ing =>
        ing.name.toLowerCase().includes(q) ||
        ing.aka.toLowerCase().includes(q) ||
        ing.category.toLowerCase().includes(q) ||
        ing.benefits.some(b => b.toLowerCase().includes(q))
    );
}

export function getIngredientById(id) {
    return ingredients.find(ing => ing.id === id);
}
