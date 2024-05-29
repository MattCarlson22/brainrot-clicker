// MyButton.tsx

import React, { useState } from 'react';
import { styles } from '../styles/styles';

interface MyButtonProps {
  clicks: number;
  setClicks: React.Dispatch<React.SetStateAction<number>>;
  totalCPS: number;
  addFallingShake: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ clicks, setClicks, totalCPS, addFallingShake }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleClick() {
    setClicks(prevClicks => prevClicks + 1);
    setClicked(true);
    addFallingShake();
    setTimeout(() => {
      setClicked(false);
    }, 100); // Adjust the delay as needed
  }

  return (
    <div style={styles.buttonContainer}>
      <div style={styles.cpsCounter}>Grimace Shakes per second: {totalCPS.toFixed(1)}</div>
      <div style={styles.counter}> {Math.floor(clicks)} Shakes</div>
      <button
        style={{
          ...styles.button,
          ...(hovered && styles.buttonHovered),
          ...(clicked && styles.buttonClicked),
        }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
}

export default MyButton;
