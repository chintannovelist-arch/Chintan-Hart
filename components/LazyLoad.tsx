
import React, { useState, useRef, useEffect, Suspense } from 'react';

// A simple loading placeholder that matches the site's aesthetic.
const SectionLoader = () => (
    <div className="flex items-center justify-center w-full min-h-[70vh] bg-black">
        <div className="w-10 h-10 border-2 border-white/10 border-t-primary rounded-full animate-spin"></div>
    </div>
);


interface LazyLoadProps {
  children: React.ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when the element is intersecting
        if (entry.isIntersecting) {
          setIsInView(true);
          // Stop observing once it's visible
          observer.unobserve(entry.target);
        }
      },
      {
        // Start loading when the component is 250px away from the viewport
        rootMargin: '250px',
      }
    );
    if (ref.current) {
        observer.observe(ref.current);
    }
    return () => {
      // Clean up observer
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
        {isInView ? (
            <Suspense fallback={<SectionLoader />}>
                {children}
            </Suspense>
        ) : <SectionLoader />}
    </div>
  );
};

export default LazyLoad;
