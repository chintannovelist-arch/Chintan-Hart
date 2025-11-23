
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check initial theme state
        const isLight = document.documentElement.classList.contains('light-theme');
        setIsDark(!isLight);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/50 text-slate-400 hover:text-primary transition-all duration-300 group relative overflow-hidden"
            aria-label="Toggle Theme"
        >
            <div className="relative z-10">
                {isDark ? (
                    <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                    <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-500" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
