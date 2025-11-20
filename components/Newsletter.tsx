import React, { useState } from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, appId } from '../services/firebase';

interface NewsletterProps {
    user: any;
}

const Newsletter: React.FC<NewsletterProps> = ({ user }) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'subscribers'), { 
                email, 
                timestamp: serverTimestamp() 
            });
            setStatus("success"); 
            setEmail("");
        } catch (err) { 
            console.error(err);
            setStatus("error"); 
        }
    };

    return (
        <section id="newsletter" className="py-24 bg-primary text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            {/* Radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>

            <div className="relative z-10 px-6 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                    <Mail size={32} className="text-white" />
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium">Join the Inner Circle</h2>
                <p className="mb-10 opacity-90 text-lg font-light leading-relaxed">Get exclusive bonus chapters, early cover reveals, and personal updates from the author's desk.</p>
                
                {status === "success" ? (
                    <div className="flex justify-center items-center gap-3 bg-white/20 backdrop-blur-md py-4 px-8 rounded-full inline-flex border border-white/30 shadow-lg animate-fade-in">
                        <CheckCircle size={20} className="text-green-300" /> 
                        <span className="font-medium">Subscribed! Welcome to the family.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="Enter your email address" 
                            className="flex-1 p-4 rounded-md text-slate-800 outline-none shadow-xl border-2 border-transparent focus:border-secondary transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-secondary/50" 
                            required 
                            aria-label="Email address for newsletter"
                        />
                        <button 
                            type="submit" 
                            disabled={status === "loading"} 
                            className="px-8 py-4 bg-secondary text-primary font-bold rounded-md hover:bg-white transition-colors shadow-xl uppercase tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            {status === "loading" ? "..." : "Subscribe"}
                        </button>
                    </form>
                )}
                {status === "error" && <p className="text-sm text-red-200 mt-4 bg-red-900/20 inline-block px-4 py-1 rounded-full">Something went wrong. Please try again.</p>}
            </div>
        </section>
    );
};

export default Newsletter;