
import React, { useState } from 'react';
import { CheckCircle, Mail, AlertTriangle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isDemoMode } from '../services/firebase';

interface NewsletterProps {
    user: any;
}

/**
 * --- 1. GOOGLE SHEET & EMAIL SETUP (REQUIRED) ---
 * 
 * To send emails and update your Sheet, you MUST deploy this script:
 * 
 * 1. Open your Sheet: https://docs.google.com/spreadsheets/d/1VisEuWmVX0abLYCmrkrRrXbDOWDHPTdpD-zhuz4sHXw/edit?usp=sharing
 * 2. Extensions > Apps Script.
 * 3. Paste this code:
 * 
 *    function doPost(e) {
 *      var lock = LockService.getScriptLock();
 *      lock.tryLock(10000);
 *      try {
 *        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *        var email = e.parameter.email;
 *        var timestamp = new Date();
 *        
 *        // Save to Sheet
 *        sheet.appendRow([timestamp, email]);
 *        
 *        // Send Email
 *        MailApp.sendEmail({
 *          to: email,
 *          subject: "Welcome to The Jasmine Knot",
 *          htmlBody: "<h3>Welcome to the Inner Circle</h3><p>You have successfully subscribed to updates for <em>The Jasmine Knot</em>.</p><p>Stay tuned for exclusive content.</p><br><p>- Chintan Hart</p>"
 *        });
 *        
 *        return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
 *      } catch(e) {
 *        return ContentService.createTextOutput(JSON.stringify({result: "error", error: e})).setMimeType(ContentService.MimeType.JSON);
 *      } finally {
 *        lock.releaseLock();
 *      }
 *    }
 * 
 * 4. Deploy > New Deployment > Type: Web App.
 * 5. Who has access: "Anyone" (CRITICAL).
 * 6. Copy URL and paste below.
 */

const GOOGLE_SCRIPT_URL = ""; // <--- PASTE WEB APP URL HERE

const Newsletter: React.FC<NewsletterProps> = ({ user }) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            // 1. Save to Database (Firebase Firestore)
            // We use a root-level 'subscribers' collection for simplicity and reliability.
            if (!isDemoMode) {
                try {
                    await addDoc(collection(db, 'subscribers'), { 
                        email, 
                        timestamp: serverTimestamp(),
                        source: 'website',
                        userAgent: navigator.userAgent
                    });
                    console.log("Saved to Firestore Database");
                } catch (dbErr) {
                    console.error("Database save failed:", dbErr);
                    // We continue even if DB fails, to try sending the email/sheet update
                }
            }

            // 2. Send Email & Update Sheet (via Google Script)
            if (GOOGLE_SCRIPT_URL) {
                const payload = new URLSearchParams();
                payload.append('email', email);
                payload.append('timestamp', new Date().toISOString());

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Essential for Google Script Web Apps
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: payload.toString()
                });
            } else {
                console.warn("Google Script URL missing. Email/Sheet update skipped.");
            }

            setStatus("success"); 
            setEmail("");
        } catch (err: any) { 
            console.error("Subscription error:", err);
            setStatus("error"); 
            setErrorMsg("Connection failed. Please try again.");
        }
    };

    return (
        <section id="newsletter" className="py-24 bg-primary text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>

            <div className="relative z-10 px-6 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm shadow-lg">
                    <Mail size={32} className="text-white" />
                </div>
                
                <h2 className="font-display text-4xl md:text-5xl mb-4 font-medium tracking-wide">Join the Inner Circle</h2>
                <p className="mb-10 opacity-90 text-lg font-light leading-relaxed max-w-lg mx-auto">
                    Get exclusive bonus chapters, early cover reveals, and personal updates directly from the author's desk.
                </p>
                
                {status === "success" ? (
                    <div className="animate-fade-in-up">
                        <div className="flex justify-center items-center gap-3 bg-white text-primary py-4 px-8 rounded-full inline-flex shadow-xl mb-4">
                            <CheckCircle size={20} className="text-green-500" /> 
                            <span className="font-bold text-sm uppercase tracking-widest">Subscribed Successfully</span>
                        </div>
                        <p className="text-white/80 text-sm">Welcome to the family.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative z-20">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="Enter your email address" 
                                className="flex-1 p-4 rounded-md bg-white text-slate-900 outline-none shadow-xl border-2 border-transparent focus:border-white/50 transition-all placeholder:text-slate-400 focus:ring-4 focus:ring-white/20 font-body" 
                                required 
                                aria-label="Email address for newsletter"
                            />
                            <button 
                                type="submit" 
                                disabled={status === "loading"} 
                                className="px-8 py-4 bg-[#0F0F0F] text-white hover:bg-black font-bold rounded-md transition-all shadow-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
                            >
                                {status === "loading" ? <Loader2 size={16} className="animate-spin"/> : "Subscribe"}
                            </button>
                        </form>
                        
                        {!GOOGLE_SCRIPT_URL && (
                            <div className="inline-flex items-center gap-2 text-[10px] bg-black/20 px-4 py-2 rounded border border-white/10 text-white/60">
                                <AlertTriangle size={12} />
                                <span>Email system pending configuration.</span>
                            </div>
                        )}
                    </div>
                )}
                
                {status === "error" && (
                    <p className="text-sm text-red-200 mt-4 bg-red-900/40 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-red-500/30 animate-fade-in">
                        {errorMsg || "Something went wrong. Please try again."}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
