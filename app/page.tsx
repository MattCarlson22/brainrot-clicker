// page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import MyButton from './components/MyButton';
import Sidebar from './components/Sidebar';
import { styles, FallingShake } from './styles/styles';

type ItemKeys = 'placeholder1' | 'placeholder2' | 'placeholder3';

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [items, setItems] = useState<{ [key in ItemKeys]: number }>({ placeholder1: 0, placeholder2: 0, placeholder3: 0 });
  const [prices, setPrices] = useState<{ [key in ItemKeys]: number }>({ placeholder1: 10, placeholder2: 100, placeholder3: 1000 });
  const [fallingShakes, setFallingShakes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const savedClicks = localStorage.getItem('clickCount');
    if (savedClicks) {
      setClicks(parseInt(savedClicks, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clickCount', clicks.toString());
  }, [clicks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const additionalClicks = (items.placeholder1 * 0.1) + (items.placeholder2 * 1) + (items.placeholder3 * 10);
      setClicks(prevClicks => Math.round((prevClicks + additionalClicks) * 10) / 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [items]);

  const buyItem = (item: ItemKeys) => {
    const price = prices[item];
    if (clicks >= price) {
      setClicks(clicks - price);
      setItems({ ...items, [item]: items[item] + 1 });
      setPrices({ ...prices, [item]: Math.round(price * 1.2) });
    }
  };

  const totalCPS = (items.placeholder1 * 0.1) + (items.placeholder2 * 1) + (items.placeholder3 * 10);

  const addFallingShake = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const leftPosition = Math.random() * 100; // Random left position between 0% and 100%
    const newShake = (
      <FallingShake
        key={id}
        style={{
          left: `${leftPosition}%`,
        }}
      />
    );
    setFallingShakes(prevShakes => [...prevShakes, newShake]);

    // Remove the shake after animation is done
    setTimeout(() => {
      setFallingShakes(prevShakes => prevShakes.filter(shake => shake.key !== id));
    }, 3000); // Duration of the animation
  };

  return (
    <div style={styles.container}>
      {fallingShakes}
      <MyButton clicks={clicks} setClicks={setClicks} totalCPS={totalCPS} addFallingShake={addFallingShake} />
      <Sidebar clicks={clicks} items={items} prices={prices} buyItem={buyItem} />
    </div>
  );
}