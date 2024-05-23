"use client";

import { useEffect } from 'react';
import styles from './shootingStars.module.css';

const ShootingStars: React.FC = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('p');
      const uniqueId = `star-${Date.now()}-${Math.random()}`;
      star.id = uniqueId;
      star.className = `${styles.star}`;
      star.textContent = '$';
      const x = Math.random() * 100;
      const duration = Math.random() * 2.5 + 2.5;
      star.style.cssText = `left:${x}vw; top:-10px; animation-duration:${duration}s;`;
      document.body.appendChild(star);

      setTimeout(() => {
        const starToRemove = document.getElementById(uniqueId);
        if (starToRemove) {
          starToRemove.remove();
        }
      }, 20000);
    };

    const createMultipleStars = () => {
      for (let i = 0; i < 6; i++) {
        createStar();
      }
    };

    const intervalId = setInterval(createMultipleStars, 100);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default ShootingStars;
