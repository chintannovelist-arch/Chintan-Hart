
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Send, MoreHorizontal, Circle, Smile, Check, CheckCheck, Info } from 'lucide-react';
import { ChatMessage } from '../types';
import { callGeminiChatStream } from '../services/geminiService';

const CHARACTER_BIOS: Record<string, string> = {
    Vijay: "The Architect. Controlled, protective, and intensely private. He communicates in brevity and action, hiding a storm of emotion behind a wall of logic.",
    Meena: "The Muse. Spirited, poetic, and deeply observant. She sees the world through sensory details and isn't afraid to challenge the silence between them."
};

const EMOJIS = ["❤️", "🥺", "😂", "🔥", "✨", "😳", "😭", "😡", "🙏", "💔"];

// --- Sub-components for Performance Optimization ---

const Avatar = ({ char, role }: { char: string, role: string }) => {
    const isUser = role === 'user';
    // Deterministic color based on character name for simple visual distinction
    const bgColor = isUser ? 'bg-primary' : (char === 'Vijay' ? 'bg-slate-700' : 'bg-rose-900');
    const textColor = isUser ? 'text-white' : (char === 'Vijay' ? 'text-blue-200' : 'text-rose-200');
    const initial = isUser ? 'U' : char[0];

    return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${bgColor} ${textColor} border border-white/10 shrink-0`}>
            {initial}
        </div>
    );
};

const MessageBubble = React.memo(({ msg, selectedChar }: { msg: ChatMessage, selectedChar: string }) => {
    const isUser = msg.role === 'user';
    
    return (
        <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up group`}>
            {!isUser && <Avatar char={selectedChar} role="char" />}
            
            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
                 <div className={`p-4 text-sm font-body leading-relaxed shadow-md relative ${
                    isUser 
                    ? 'bg-primary text-white rounded-2xl rounded-tr-none' 
                    : 'bg-onyx border border-white/10 text-slate-300 rounded-2xl rounded-tl-none'
                }`}>
                    {msg.text}
                </div>
                
                {/* Read Receipt / Status for User */}
                {isUser && (
                    <div className="flex items-center gap-1 mt-1 mr-1 opacity-70 transition-opacity">
                         <span className="text-[9px] text-slate-400 font-medium">
                            {msg.status === 'read' ? 'Read' : msg.status === 'delivered' ? 'Delivered' : 'Sent'}
                         </span>
                         {msg.status === 'read' ? (
                             <CheckCheck size={12} className="text-blue-300" />
                         ) : msg.status === 'delivered' ? (
                             <CheckCheck size={12} className="text-slate-400" />
                         ) : (
                             <Check size={12} className="text-slate-400" />
                         )}
                    </div>
                )}
            </div>

            {isUser && <Avatar char="User" role="user" />}
        </div>
    );
});
MessageBubble.displayName = 'MessageBubble';

const ChatInputForm = React.memo(({ onSend, selectedChar, isTyping }: { onSend: (msg: string) => void; selectedChar: string; isTyping: boolean }) => {
    const [message, setMessage] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isTyping) return;
        onSend(message);
        setMessage("");
        setShowEmojis(false);
    };

    const addEmoji = (emoji: string) => {
        setMessage(prev => prev + emoji);
    };

    return (
        <div className="p-4 border-t border-white/5 bg-black/80 backdrop-blur-md relative">
            {showEmojis && (
                <div className="absolute bottom-full left-4 mb-2 bg-onyx border border-white/10 p-3 rounded-lg shadow-xl grid grid-cols-5 gap-2 animate-fade-in z-20">
                    {EMOJIS.map(e => (
                        <button 
                            key={e} 
                            onClick={() => addEmoji(e)}
                            className="p-2 hover:bg-white/10 rounded-md transition-colors text-lg"
                        >
                            {e}
                        </button>
                    ))}
                </div>
            )}
            
            <form onSubmit={handleSend} className="flex gap-4">
                <div className="relative flex-1">
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder={`Message ${selectedChar}...`} 
                        disabled={isTyping}
                        className="w-full p-4 pr-12 bg-white/5 rounded-sm outline-none focus:bg-white/10 border border-white/5 focus:border-primary/30 text-white transition-all placeholder:text-slate-600 font-body text-sm focus:ring-1 focus:ring-primary/20 disabled:opacity-50" 
                        aria-label="Message input"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowEmojis(!showEmojis)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors p-1"
                    >
                        <Smile size={20} />
                    </button>
                </div>
                <button 
                    type="submit" 
                    disabled={!message.trim() || isTyping} 
                    className="w-14 h-14 bg-primary text-white rounded-sm hover:bg-primary-dark transition-all flex items-center justify-center disabled:opacity-50 disabled:bg-slate-800 shadow-glow"
                    aria-label="Send message"
                >
                    <Send size={20} className={message.trim() ? "ml-0.5" : ""} />
                </button>
            </form>
        </div>
    );
});
ChatInputForm.displayName = 'ChatInputForm';

// --- Main Component ---

const CharacterConnect: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState("Vijay");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const activeCharRef = useRef(selectedChar);
    const isMounted = useRef(true);

    // Mount tracking to prevent state updates on unmounted component
    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    // Keep ref in sync for race condition checks
    useEffect(() => {
        activeCharRef.current = selectedChar;
    }, [selectedChar]);

    const handleSend = useCallback(async (message: string) => {
        if (!message.trim()) return;
        
        const currentCharacter = selectedChar;
        const timestamp = Date.now();
        
        // Add user message with 'sent' status
        const newUserMsg: ChatMessage = { role: 'user', text: message, status: 'sent', timestamp };
        setChatHistory(prev => [...prev, newUserMsg]);
        
        setIsTyping(true);

        // Simulate "Delivered" then "Read" delay before AI starts typing
        setTimeout(() => {
            // Guard clause: If user switched characters or unmounted, stop.
            if (!isMounted.current || activeCharRef.current !== currentCharacter) return;

            setChatHistory(prev => prev.map(msg => 
                msg.timestamp === timestamp ? { ...msg, status: 'delivered' } : msg
            ));
        }, 600);

        setTimeout(async () => {
            if (!isMounted.current || activeCharRef.current !== currentCharacter) return;

            setChatHistory(prev => prev.map(msg => 
                msg.timestamp === timestamp ? { ...msg, status: 'read' } : msg
            ));

             // Start AI Stream
            setChatHistory(prev => [...prev, { role: 'char', text: '', timestamp: Date.now() }]);

            try {
                const stream = callGeminiChatStream(currentCharacter, message);
                
                for await (const chunk of stream) {
                    if (!isMounted.current || activeCharRef.current !== currentCharacter) break;

                    setChatHistory(prev => {
                        const newHistory = [...prev];
                        const lastIndex = newHistory.length - 1;
                        if (lastIndex >= 0) {
                            // CRITICAL FIX: Create shallow copy of the message object.
                            // React.memo on MessageBubble checks prop identity. 
                            // If we mutate the object in place, React.memo won't trigger a re-render.
                            const lastMsg = { ...newHistory[lastIndex] };
                            
                            if (lastMsg.role === 'char') {
                                lastMsg.text += chunk;
                                newHistory[lastIndex] = lastMsg;
                            }
                        }
                        return newHistory;
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (isMounted.current && activeCharRef.current === currentCharacter) {
                    setIsTyping(false);
                }
            }
        }, 1500); // 1.5s delay to simulate reading

    }, [selectedChar]);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, isTyping]);

    return (
        <section id="connect" className="py-32 bg-black relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold">
                        <MessageCircle size={12} /> <span>Direct Line</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Character Connect</h2>
                    <p className="text-slate-400 font-body font-light">Text directly with the characters. Unfiltered access.</p>
                </div>
                
                <div className="bg-black border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px] max-w-5xl mx-auto backdrop-blur-sm spotlight-card">
                    {/* Sidebar */}
                    <div className="w-full md:w-80 bg-onyx p-6 flex flex-col gap-6 border-r border-white/5" role="tablist" aria-label="Character Selection">
                        <div>
                            <h3 className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 px-2">Select Contact</h3>
                            <div className="space-y-2">
                                {["Vijay", "Meena"].map(char => (
                                    <button 
                                        key={char}
                                        onClick={() => { setSelectedChar(char); setChatHistory([]); }} 
                                        className={`w-full p-4 rounded-sm flex items-center gap-4 transition-all duration-300 group border border-transparent focus:outline-none focus:ring-1 focus:ring-primary ${selectedChar === char ? "bg-white/5 border-white/10 shadow-[0_0_15px_rgba(37,150,190,0.15)]" : "hover:bg-white/5 hover:border-white/5 hover:translate-x-1"}`}
                                        role="tab"
                                        aria-selected={selectedChar === char}
                                    >
                                        <Avatar char={char} role="char" />
                                        <div className="text-left flex-1">
                                            <div className={`font-bold font-body text-sm tracking-wide ${selectedChar === char ? "text-white" : "text-slate-400"}`}>{char}</div>
                                            <div className="text-[10px] uppercase tracking-wider opacity-50 text-slate-500">{char === "Vijay" ? "Husband" : "Wife"}</div>
                                        </div>
                                        {selectedChar === char && <Circle size={8} className="fill-primary text-primary animate-pulse" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="mt-auto p-4 bg-white/5 rounded-sm border border-white/5 animate-fade-in">
                            <div className="flex items-center gap-2 mb-2 text-primary/80">
                                <Info size={12} />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Bio</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-serif italic">
                                "{CHARACTER_BIOS[selectedChar]}"
                            </p>
                        </div>
                    </div>
                    
                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-black/60 relative" id={`chat-panel-${selectedChar}`} role="tabpanel">
                        {/* Header */}
                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                                <div>
                                    <div className="font-display text-lg text-white tracking-wide leading-none">{selectedChar}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Online</div>
                                </div>
                            </div>
                            <MoreHorizontal size={20} className="text-slate-600 cursor-pointer hover:text-white transition-colors" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative">
                            {chatHistory.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-700 gap-4 opacity-50 pointer-events-none">
                                    <div className="p-6 border border-white/5 rounded-full bg-white/5"><MessageCircle size={32} strokeWidth={1} /></div>
                                    <div className="text-xs uppercase tracking-[0.2em] font-bold">Start the conversation</div>
                                </div>
                            )}
                            
                            {chatHistory.map((msg, idx) => (
                                // Don't render empty placeholder messages until they have text to prevent empty bubbles
                                (msg.text || isTyping) && <MessageBubble key={idx} msg={msg} selectedChar={selectedChar} />
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && chatHistory[chatHistory.length - 1]?.text === "" && (
                                <div className="flex items-end gap-3 justify-start animate-fade-in">
                                    <Avatar char={selectedChar} role="char" />
                                    <div className="bg-onyx border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-lg">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 animate-pulse mb-2">{selectedChar} is typing...</span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        
                        {/* Input */}
                        <ChatInputForm onSend={handleSend} selectedChar={selectedChar} isTyping={isTyping} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharacterConnect;
