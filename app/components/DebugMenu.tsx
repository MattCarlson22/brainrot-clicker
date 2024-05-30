// DebugMenu.tsx
import React, { useState } from 'react';
import { styles } from '../styles/styles';

interface DebugMenuProps {
  clicks: number;
  setClicks: React.Dispatch<React.SetStateAction<number>>;
  closeMenu: () => void;
  resetGame: () => void;
}

const DebugMenu: React.FC<DebugMenuProps> = ({ clicks, setClicks, closeMenu, resetGame }) => {
  const [inputValue, setInputValue] = useState(clicks.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    const newClicks = parseInt(inputValue, 10);
    if (!isNaN(newClicks)) {
      setClicks(newClicks);
    }
    closeMenu();
  };

  const handleReset = () => {
    resetGame();
    closeMenu();
  }

  return (
    <div style={styles.debugMenu}>
      <h3>Debug Menu</h3>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        style={styles.debugInput}
      />
      <button onClick={handleSave} style={styles.debugButton}>Save</button>
      <button onClick={handleReset} style={styles.debugButton}>Reset Game</button>
      <button onClick={closeMenu} style={styles.debugButton}>Close</button>
    </div>
  );
};

export default DebugMenu;