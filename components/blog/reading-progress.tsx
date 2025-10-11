'use client'

import { useEffect } from 'react'

export function ReadingProgress() {
  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const scrollTop = window.scrollY;
      const docHeight = article.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);

      const progressBar = document.getElementById('reading-progress');
      if (progressBar) {
        progressBar.style.width = Math.min(scrollPercentRounded, 100) + '%';
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-primary/20 w-full z-50">
      <div 
        id="reading-progress" 
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: '0%' }}
      />
    </div>
  );
}
