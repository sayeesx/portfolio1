// components/RotatingTags.js
import React, { useState, useEffect } from 'react';
import styles from './RotatingTags.module.css';

const tags = ["Entrepreneur", "Trader", "Investor", "Software Engineer", "Web Developer", "Crypto Investor"];

const RotatingTags = () => {
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentTagIndex((prevIndex) => (prevIndex + 1) % tags.length);
        setIsFlipping(false);
      }, 500); // Duration of each flip
    }, 2000); // Change tag every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <span className={`${styles.tag} ${isFlipping ? styles.flipping : ''}`}>
      {tags[currentTagIndex]}
    </span>
  );
};

export default RotatingTags;
