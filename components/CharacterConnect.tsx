import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, MoreHorizontal, Circle } from 'lucide-react';
import { ChatMessage } from '../types';
import { callGeminiChat } from '../services/geminiService';

const CharacterConnect: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState("Vijay");
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        const newUserMsg: ChatMessage = { role: 'user', text: message };
        setChatHistory(prev => [...prev, newUserMsg]);
        setMessage("");
        setIsTyping(true);
        const response = await callGeminiChat(selectedChar, message);
        setIsTyping(false);
        setChatHistory(prev => [...prev, { role: 'char', text: response }]);
    };

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, isTyping]);

    return (
        <section id="connect" className="py-32 bg-black relative">
             {/* Gradient Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold">
                        <MessageCircle size={12} /> <span>Direct Line</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Character Connect</h2>
                    <p className="text-slate-400 font-body font-light">Text directly with the characters. Unfiltered access.</p>
                </div>
                
                <div className="bg-black border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px] max-w-4xl mx-auto backdrop-blur-sm">
                    {/* Sidebar */}
                    <div className="w-full md:w-72 bg-onyx p-6 flex flex-col gap-2 border-r border-white/5" role="tablist" aria-label="Character Selection">
                        <h3 className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 px-2">Select Contact</h3>
                        {["Vijay", "Meena"].map(char => (
                            <button 
                                key={char}
                                onClick={() => { setSelectedChar(char); setChatHistory([]); }} 
                                className={`p-4 rounded-sm flex items-center gap-4 transition-all group border border-transparent focus:outline-none focus:ring-1 focus:ring-primary ${selectedChar === char ? "bg-white/5 border-white/10" : "hover:bg-white/5 hover:border-white/5 hover:translate-x-1"}`}
                                role="tab"
                                aria-selected={selectedChar === char}
                                aria-controls={`chat-panel-${char}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-display shadow-inner transition-colors ${selectedChar === char ? "bg-primary text-white" : "bg-black text-slate-500"}`}>
                                    {char[0]}
                                </div>
                                <div className="text-left flex-1">
                                    <div className={`font-bold font-body text-sm tracking-wide ${selectedChar === char ? "text-white" : "text-slate-400"}`}>{char}</div>
                                    <div className="text-[10px] uppercase tracking-wider opacity-50 text-slate-500">{char === "Vijay" ? "Husband" : "Wife"}</div>
                                </div>
                                {selectedChar === char && <Circle size={8} className="fill-primary text-primary animate-pulse" />}
                            </button>
                        ))}
                    </div>
                    
                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-black/60 relative" id={`chat-panel-${selectedChar}`} role="tabpanel">
                        {/* Header */}
                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <div className="font-display text-lg text-white tracking-wide">{selectedChar}</div>
                            </div>
                            <MoreHorizontal size={20} className="text-slate-600 cursor-pointer hover:text-white transition-colors" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                            {chatHistory.length === 0 && (
                                <div className="h-full flex items-center justify-center flex-col text-slate-700 gap-4 opacity-50">
                                    <div className="p-4 border border-white/5 rounded-full"><MessageCircle size={32} strokeWidth={1} /></div>
                                    <div className="text-xs uppercase tracking-[0.2em] font-bold">Start the conversation</div>
                                </div>
                            )}
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                    <div className={`max-w-[80%] p-5 text-sm font-body leading-relaxed shadow-md relative ${
                                        msg.role === 'user' 
                                        ? 'bg-primary text-white rounded-2xl rounded-tr-none' 
                                        : 'bg-onyx border border-white/10 text-slate-300 rounded-2xl rounded-tl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="bg-onyx border border-white/10 px-5 py-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-[0_0_15px_rgba(37,150,190,0.1)]">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        
                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-4 bg-black/80 backdrop-blur-md">
                            <input 
                                type="text" 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                placeholder={`Message ${selectedChar}...`} 
                                className="flex-1 p-4 bg-white/5 rounded-sm outline-none focus:bg-white/10 border border-white/5 focus:border-primary/30 text-white transition-all placeholder:text-slate-600 font-body text-sm focus:ring-1 focus:ring-primary/20" 
                                aria-label="Message input"
                            />
                            <button 
                                type="submit" 
                                disabled={!message.trim()} 
                                className="w-14 h-14 bg-primary text-white rounded-sm hover:bg-primary-dark transition-all flex items-center justify-center disabled:opacity-50 disabled:bg-slate-800 shadow-glow"
                                aria-label="Send message"
                            >
                                <Send size={20} className={message.trim() ? "ml-0.5" : ""} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharacterConnect;