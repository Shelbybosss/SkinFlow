import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearch, IoChevronBack } from 'react-icons/io5';
import { ingredients, searchIngredients, getIngredientById } from '../data/ingredients';
import { articles, getArticleById } from '../data/articles';
import { dietRecommendations } from '../data/dietRecommendations';

export default function Learn() {
    const [activeTab, setActiveTab] = useState('articles');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedDiet, setSelectedDiet] = useState(null);

    const filteredIngredients = searchIngredients(searchQuery);

    // Show detail views
    if (selectedIngredient) {
        return <IngredientDetail ingredient={selectedIngredient} onBack={() => setSelectedIngredient(null)} />;
    }
    if (selectedArticle) {
        return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }
    if (selectedDiet) {
        return <DietDetail diet={selectedDiet} onBack={() => setSelectedDiet(null)} />;
    }

    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="page-header">
                    <h1>Learn</h1>
                    <p>Skincare knowledge at your fingertips</p>
                </div>

                {/* Tabs */}
                <div className="tab-bar">
                    <button className={`tab ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>
                        📚 Articles
                    </button>
                    <button className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={() => setActiveTab('ingredients')}>
                        🔬 Ingredients
                    </button>
                    <button className={`tab ${activeTab === 'diet' ? 'active' : ''}`} onClick={() => setActiveTab('diet')}>
                        🥗 Diet
                    </button>
                </div>

                {/* Articles Tab */}
                {activeTab === 'articles' && (
                    <div>
                        {articles.map(article => (
                            <div
                                key={article.id}
                                className="article-card"
                                onClick={() => setSelectedArticle(article)}
                            >
                                <div className="article-icon">{article.icon}</div>
                                <div className="article-info">
                                    <h4>{article.title}</h4>
                                    <div className="article-meta">{article.category} · {article.readTime}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Ingredients Tab */}
                {activeTab === 'ingredients' && (
                    <div>
                        <div className="search-bar">
                            <IoSearch className="search-icon" />
                            <input
                                placeholder="Search ingredients..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {filteredIngredients.map(ing => (
                            <div
                                key={ing.id}
                                className="article-card"
                                onClick={() => setSelectedIngredient(ing)}
                            >
                                <div className="article-icon" style={{ background: 'var(--peach-light)' }}>
                                    🧪
                                </div>
                                <div className="article-info">
                                    <h4>{ing.name}</h4>
                                    <div className="article-meta">{ing.category} · {ing.aka}</div>
                                </div>
                            </div>
                        ))}
                        {filteredIngredients.length === 0 && (
                            <div className="empty-state">
                                <div className="empty-icon">🔍</div>
                                <p>No ingredients found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Diet Tab */}
                {activeTab === 'diet' && (
                    <div>
                        {Object.entries(dietRecommendations).map(([key, diet]) => (
                            <div
                                key={key}
                                className="article-card"
                                onClick={() => setSelectedDiet(diet)}
                            >
                                <div className="article-icon" style={{ background: 'var(--beige-light)' }}>
                                    {diet.icon}
                                </div>
                                <div className="article-info">
                                    <h4>{diet.title}</h4>
                                    <div className="article-meta">{diet.eat.length} foods to eat · {diet.avoid.length} to avoid</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function IngredientDetail({ ingredient, onBack }) {
    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'var(--green-primary)', fontWeight: 600, marginBottom: 16, fontFamily: 'inherit', fontSize: 15 }}>
                    <IoChevronBack size={20} /> Back
                </button>

                <h1 style={{ marginBottom: 4 }}>{ingredient.name}</h1>
                <p className="text-secondary text-sm" style={{ marginBottom: 20 }}>{ingredient.aka}</p>

                <div className="card">
                    <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>{ingredient.description}</p>
                </div>

                <div className="card card-green">
                    <h4 style={{ marginBottom: 12 }}>✅ Benefits</h4>
                    {ingredient.benefits.map((b, i) => (
                        <p key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', padding: '4px 0' }}>• {b}</p>
                    ))}
                </div>

                <div className="card">
                    <h4 style={{ marginBottom: 12 }}>👤 Best For</h4>
                    <div className="chip-group">
                        {ingredient.bestFor.map((s, i) => (
                            <span key={i} className="chip active">{s}</span>
                        ))}
                    </div>
                </div>

                <div className="card card-peach">
                    <h4 style={{ marginBottom: 8 }}>⏰ How Often</h4>
                    <p className="text-sm text-secondary">{ingredient.frequency}</p>
                </div>

                {ingredient.sideEffects.length > 0 && (
                    <div className="card">
                        <h4 style={{ marginBottom: 12 }}>⚠️ Possible Side Effects</h4>
                        {ingredient.sideEffects.map((s, i) => (
                            <p key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', padding: '4px 0' }}>• {s}</p>
                        ))}
                    </div>
                )}

                {ingredient.avoidMixingWith.length > 0 && (
                    <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                        <h4 style={{ marginBottom: 12 }}>🚫 Avoid Mixing With</h4>
                        {ingredient.avoidMixingWith.map((a, i) => (
                            <p key={i} style={{ fontSize: 14, color: 'var(--danger)', padding: '4px 0' }}>• {a}</p>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function ArticleDetail({ article, onBack }) {
    const paragraphs = article.content.split('\n\n');

    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'var(--green-primary)', fontWeight: 600, marginBottom: 16, fontFamily: 'inherit', fontSize: 15 }}>
                    <IoChevronBack size={20} /> Back
                </button>

                <div style={{ fontSize: 48, marginBottom: 12 }}>{article.icon}</div>
                <h1 style={{ marginBottom: 8 }}>{article.title}</h1>
                <p className="text-secondary text-sm" style={{ marginBottom: 24 }}>{article.category} · {article.readTime}</p>

                <div className="article-content" style={{ padding: 0 }}>
                    {paragraphs.map((para, i) => {
                        if (para.startsWith('**') && para.endsWith('**')) {
                            return <h3 key={i} style={{ marginTop: 20, marginBottom: 8 }}>{para.replace(/\*\*/g, '')}</h3>;
                        }
                        if (para.includes('**')) {
                            const parts = para.split(/\*\*(.*?)\*\*/g);
                            return (
                                <p key={i} style={{ marginBottom: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {parts.map((part, j) => j % 2 === 0 ? part : <strong key={j} style={{ color: 'var(--text-primary)' }}>{part}</strong>)}
                                </p>
                            );
                        }
                        return <p key={i} style={{ marginBottom: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{para}</p>;
                    })}
                </div>
            </motion.div>
        </div>
    );
}

function DietDetail({ diet, onBack }) {
    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'var(--green-primary)', fontWeight: 600, marginBottom: 16, fontFamily: 'inherit', fontSize: 15 }}>
                    <IoChevronBack size={20} /> Back
                </button>

                <div style={{ fontSize: 48, marginBottom: 12 }}>{diet.icon}</div>
                <h1 style={{ marginBottom: 24 }}>{diet.title}</h1>

                <div className="card card-green">
                    <h4 style={{ marginBottom: 16 }}>✅ Foods to Eat</h4>
                    {diet.eat.map((item, i) => (
                        <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < diet.eat.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.food}</p>
                            <p className="text-xs text-secondary">{item.benefit}</p>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                    <h4 style={{ marginBottom: 16 }}>🚫 Foods to Avoid</h4>
                    {diet.avoid.map((item, i) => (
                        <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < diet.avoid.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.food}</p>
                            <p className="text-xs text-secondary">{item.reason}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
