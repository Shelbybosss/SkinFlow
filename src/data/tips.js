export const skincareTips = [
    "Always apply skincare products from thinnest to thickest consistency.",
    "Pat your products in gently — don't rub. Your skin absorbs better with gentle tapping.",
    "Reapply sunscreen every 2 hours when outdoors, even on cloudy days.",
    "Never skip moisturizer, even if you have oily skin. Skipping it can make oiliness worse.",
    "Wash your pillowcase at least once a week to prevent breakouts.",
    "Don't touch your face during the day — your hands carry bacteria.",
    "Give new products at least 4–6 weeks before judging their effectiveness.",
    "Apply eye cream using your ring finger — it has the lightest touch.",
    "Double cleansing at night removes sunscreen and makeup more effectively.",
    "Vitamin C works best in the morning to protect against daytime free radicals.",
    "Retinol should always be used at night and followed by sunscreen the next day.",
    "Over-exfoliating damages your skin barrier. Stick to 2–3 times per week max.",
    "Drinking water helps keep skin hydrated from the inside out.",
    "Getting 7–8 hours of sleep allows your skin to repair itself overnight.",
    "Stress increases cortisol which can trigger breakouts and oiliness.",
    "Layer hydrating products on damp skin to lock in more moisture.",
    "SPF 30 blocks 97% of UVB rays — it's the minimum you should use daily.",
    "Niacinamide and hyaluronic acid make an excellent combo for all skin types.",
    "Don't mix retinol with AHA/BHA in the same routine to avoid irritation.",
    "Keep your skincare routine simple — 4 to 5 steps is usually enough.",
    "Cold water can help reduce puffiness, but lukewarm water is best for cleansing.",
    "Exfoliation reveals fresh skin, but overdoing it leads to sensitivity.",
    "Antioxidants like Vitamin C protect your skin from pollution and UV damage.",
    "Your neck and chest deserve the same skincare attention as your face.",
    "Consistency is more important than using expensive products.",
    "Oil-free doesn't always mean non-comedogenic — always check ingredient lists.",
    "Hyaluronic acid works best when applied to damp skin.",
    "Eating foods rich in Omega-3 helps maintain a healthy skin barrier.",
    "Wearing sunglasses protects the delicate skin around your eyes.",
    "Your skin type can change over time, so reassess your routine periodically."
];

export const dietTips = [
    "Eat foods rich in Vitamin C like oranges and berries for brighter skin.",
    "Add nuts and seeds to your diet — they're rich in Vitamin E for skin health.",
    "Reduce sugar intake to help prevent breakouts and premature aging.",
    "Green leafy vegetables provide essential nutrients for skin repair.",
    "Avocados are packed with healthy fats that keep skin moisturized.",
    "Stay hydrated — aim for 8 glasses of water daily for plump, healthy skin.",
    "Tomatoes contain lycopene which protects skin from sun damage.",
    "Sweet potatoes are rich in beta-carotene which converts to Vitamin A.",
    "Green tea has antioxidants that help fight inflammation and aging.",
    "Probiotic-rich foods like yogurt support gut health which impacts skin.",
    "Zinc-rich foods like pumpkin seeds help control oil and fight acne.",
    "Dark chocolate (70%+ cacao) contains flavonoids good for skin texture.",
    "Salmon and fatty fish provide Omega-3 for a healthy skin barrier.",
    "Reduce dairy if you notice it triggers breakouts.",
    "Eat whole grains instead of processed carbs to reduce glycemic impact.",
    "Colorful fruits and vegetables provide different antioxidants for skin protection.",
    "Coconut water is naturally hydrating and supports skin elasticity.",
    "Include turmeric in your diet for its anti-inflammatory properties.",
    "Limit caffeine and alcohol as they can dehydrate your skin.",
    "Eating regular, balanced meals keeps your blood sugar stable and skin clear."
];

export function getDailyTip(dayIndex) {
    return skincareTips[dayIndex % skincareTips.length];
}

export function getDailyDietTip(dayIndex) {
    return dietTips[dayIndex % dietTips.length];
}

export function getDayIndex() {
    const start = new Date(2024, 0, 1);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}
