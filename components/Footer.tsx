import React, { useState, useEffect } from 'react';
import { Lock, ArrowUp, X } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../services/firebase';
import { AUTHOR_NAME } from '../constants';
import { Subscriber } from '../types';

const SubscribersList = ({ onClose }: { onClose: () => void }) => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    useEffect(() => {
        const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'subscribers'), orderBy('timestamp', 'desc'));
        // Added error callback to prevent uncaught exceptions when using mock config
        const unsubscribe = onSnapshot(q, 
            (snap) => {
                setSubscribers(snap.docs.map(d => ({ id: d.id, ...d.data() } as Subscriber)));
            },
            (error) => {
                console.log("Snapshot listener error (admin view unavailable):", error);
            }
        );
        return () => unsubscribe();
    }, []);
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true">
            <div className="bg-white w-full max-w-md rounded-xl p-6 h-[60vh] flex flex-col shadow-2xl">
                <div className="flex justify-between mb-4 items-center border-b pb-4">
                    <h3 className="font-bold text-lg text-primary">Subscribers</h3>
                    <button onClick={onClose} className="hover:bg-slate-100 p-1 rounded transition-colors" aria-label="Close admin view"><X /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                    {subscribers.length === 0 && <p className="text-center text-slate-400 py-4">No subscribers yet.</p>}
                    {subscribers.map(s => (
                        <div key={s.id} className="p-3 bg-secondary/50 rounded-lg flex justify-between items-center hover:bg-secondary transition-colors">
                            <span className="font-medium text-slate-700 text-sm">{s.email}</span>
                            <span className="text-xs text-slate-400">{s.timestamp?.toDate ? s.timestamp.toDate().toLocaleDateString() : 'Just now'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Footer: React.FC = () => {
    const [showAdmin, setShowAdmin] = useState(false);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return (
        <footer className="bg-black py-12 text-white relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="text-slate-500 text-sm flex items-center gap-2">
                    <span>&copy; 2025 {AUTHOR_NAME}. All rights reserved.</span>
                    <button onClick={() => setShowAdmin(true)} className="hover:text-white transition-colors opacity-50 hover:opacity-100" aria-label="Admin access"><Lock size={12}/></button>
                </div>
                 <div className="flex gap-6 text-sm font-light text-slate-400">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
             <button onClick={scrollToTop} className="absolute right-8 top-[-20px] bg-primary p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-1 group" aria-label="Scroll to top">
                 <ArrowUp size={20} color="white" className="group-hover:scale-110 transition-transform" />
             </button>
            {showAdmin && <SubscribersList onClose={() => setShowAdmin(false)} />}
        </footer>
    );
};

export default Footer;