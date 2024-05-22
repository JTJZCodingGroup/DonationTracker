"use client";

import { useEffect } from 'react';
import styles from './shootingStars.module.css';

const ShootingStars: React.FC = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = `${styles.star}`;
      const xy = Math.random() * 100;
      const duration = Math.random() * 2.5 + 2.5;
      star.style.cssText = `top:${xy}vh; left:-10px; animation-duration:${duration}s;`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), duration * 5000);
    };

    const createMultipleStars = () => {
      // Adjust the number of stars created in each interval
      for (let i = 0; i < 6; i++) {
        createStar();
      }
    };

    // Increase the frequency of star creation
    const intervalId = setInterval(createMultipleStars, 100);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default ShootingStars;



