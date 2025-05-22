import React, { useState, useEffect } from 'react';

export default function TypeWriter({ text, onComplete, onCharacterTyped }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
        if (onCharacterTyped) onCharacterTyped();
      }, 15); // Even faster typing speed

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete(); // Remove delay here
    }
  }, [currentIndex, text, onComplete, onCharacterTyped]);

  return (
    <span className="typing-text">
      {displayedText}
      <span className="cursor"></span>
    </span>
  );
}