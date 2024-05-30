// page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import MyButton from './components/MyButton';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UpgradesSidebar from './components/UpgradesSidebar';
import DebugMenu from './components/DebugMenu';
import { styles, FallingShake } from './styles/styles';

type ItemKeys = 'placeholder1' | 'placeholder2' | 'placeholder3';
type UpgradeKeys = 'upgrade1' | 'upgrade2' | 'upgrade3'

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [items, setItems] = useState<{ [key in ItemKeys]: number }>({ placeholder1: 0, placeholder2: 0, placeholder3: 0 });
  const [prices, setPrices] = useState<{ [key in ItemKeys]: number }>({ placeholder1: 10, placeholder2: 100, placeholder3: 1000 });
  const [upgrades, setUpgrades] = useState<{ [key in UpgradeKeys]: number }>({ upgrade1: 0, upgrade2: 0, upgrade3: 0 });
  const [upgradePrices, setUpgradePrices] = useState<{ [key in UpgradeKeys]: number}>({ upgrade1: 500, upgrade2: 2000, upgrade3: 10000});
  const [fallingShakes, setFallingShakes] = useState<JSX.Element[]>([]);
  const [isDebugMenuOpen, setIsDebugMenuOpen] = useState(false);

  useEffect(() => {
    const savedClicks = localStorage.getItem('clickCount');
    const savedItems = localStorage.getItem('items');
    const savedPrices = localStorage.getItem('prices');
    const savedUpgrades = localStorage.getItem('upgrades');

    if (savedClicks) {
      setClicks(parseInt(savedClicks, 10));
    }
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices));
    }
    if (savedUpgrades) {
      const loadedUpgrades = JSON.parse(savedUpgrades);
      setUpgrades(loadedUpgrades);

      // Update the click multiplier based on the upgrades purchased
      let multiplier = 1
      for (let key in loadedUpgrades) {
        if (loadedUpgrades[key as UpgradeKeys] > 0) {
          multiplier *= 2;
        }
      }
      setClickMultiplier(multiplier);
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'd') {
        setIsDebugMenuOpen(prevState => !prevState);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  useEffect(() => {
    localStorage.setItem('clickCount', clicks.toString());
  }, [clicks]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  
  useEffect(() => {
    localStorage.setItem('prices', JSON.stringify(prices));
  }, [prices]);

  useEffect(() => {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
  }, [upgrades]);

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

  const buyUpgrade = (upgrade: UpgradeKeys) => {
    const price = upgradePrices[upgrade];
    if (clicks >= price && upgrades[upgrade] < 1) {
      setClicks(clicks - price);
      setUpgrades({ ...upgrades, [upgrade]: upgrades[upgrade] + 1});
      setClickMultiplier(prevMultiplier => prevMultiplier * 2);
    }
  }

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

  const resetGame = () => {
    setClicks(0);
    setClickMultiplier(1);
    setItems({ placeholder1: 0, placeholder2: 0, placeholder3: 0 });
    setUpgrades({ upgrade1: 0, upgrade2: 0, upgrade3: 0 });
    localStorage.removeItem('clickCount');
    localStorage.removeItem('items');
    localStorage.removeItem('prices');
    localStorage.removeItem('upgrades');
  }

  return (
    <div style={styles.container}>
      <UpgradesSidebar clicks={clicks} upgrades={upgrades} upgradePrices={upgradePrices} buyUpgrade={buyUpgrade} />
      <Header />
      {fallingShakes}
      <MyButton clicks={clicks} setClicks={setClicks} totalCPS={totalCPS} addFallingShake={addFallingShake} clickMultiplier={clickMultiplier}/>
      <Sidebar clicks={clicks} items={items} prices={prices} buyItem={buyItem} />
      {isDebugMenuOpen && <DebugMenu clicks={clicks} setClicks={setClicks} closeMenu={() => setIsDebugMenuOpen(false)} resetGame={resetGame} />}
    </div>
  );
}
