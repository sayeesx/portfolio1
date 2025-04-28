import { useState, useEffect } from 'react';

export default function TypeWriter({ text, delay = 30 }) {  // Reduced delay for smoother animation
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="opacity-0 animate-fadeIn transition-all duration-300 ease-in-out">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}