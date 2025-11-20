
import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Gift } from 'lucide-react';
import { PREDICTION_QUESTIONS } from '../constants';

const PredictionGame: React.FC = () => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const currentQ = PREDICTION_QUESTIONS[currentQIndex];

    const handleSelect = (optId: string) => {
        if (showResult) return;
        setSelectedOption(optId);
        setShowResult(true);
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        setShowResult(false);
        setCurrentQIndex((prev) => (prev + 1) % PREDICTION_QUESTIONS.length);
    };

    return (
        <section id="prediction" className="py-32 bg-secondary border-b border-white/5">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold">
                        <HelpCircle size={12} className="text-primary" /> <span>The Prediction Game</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">What Happens Next?</h2>
                    <p className="text-slate-400 font-body font-light max-w-xl mx-auto">
                        Think you know Vijay? Predict his reaction to these scenarios. Win a snippet.
                    </p>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-sm p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
                    {/* Question Header */}
                    <div className="mb-10">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{currentQ.chapter}</span>
                        <h3 className="text-2xl text-white font-serif leading-relaxed">"{currentQ.context}"</h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-4 flex-1">
                        {currentQ.options.map((opt) => {
                            const isSelected = selectedOption === opt.id;
                            const isCorrect = opt.id === currentQ.correctOption;
                            let btnClass = "border-white/10 bg-white/5 hover:bg-white/10 text-slate-300"; // default
                            
                            if (showResult) {
                                if (isCorrect) btnClass = "border-green-500/50 bg-green-900/20 text-green-100";
                                else if (isSelected && !isCorrect) btnClass = "border-red-500/50 bg-red-900/20 text-red-100 opacity-50";
                                else btnClass = "border-transparent bg-black/40 text-slate-600";
                            } else if (isSelected) {
                                btnClass = "border-primary bg-primary/10 text-white";
                            }

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => handleSelect(opt.id)}
                                    className={`w-full p-6 text-left rounded-sm border transition-all duration-300 flex items-center gap-4 group ${btnClass}`}
                                    disabled={showResult}
                                >
                                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${showResult && isCorrect ? 'border-green-500 text-green-500' : 'border-white/20 text-slate-500'}`}>
                                        {opt.id}
                                    </span>
                                    <span className="font-body text-sm tracking-wide">{opt.text}</span>
                                    {showResult && isCorrect && <CheckCircle2 className="ml-auto text-green-500" size={20}/>}
                                    {showResult && isSelected && !isCorrect && <XCircle className="ml-auto text-red-500" size={20}/>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Result Reveal */}
                    {showResult && (
                        <div className="mt-8 pt-8 border-t border-white/10 animate-fade-in-up">
                            <div className="bg-white/5 p-6 rounded-sm border-l-2 border-primary">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                                    <Gift size={12}/> The Actual Scene
                                </h4>
                                <p className="font-serif text-lg text-slate-200 italic leading-loose">
                                    "{currentQ.answerExcerpt}"
                                </p>
                                <div className="mt-6 text-right">
                                    <button onClick={nextQuestion} className="text-xs font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
                                        Next Scenario &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PredictionGame;
