import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';

const MyButton = () => {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const savedCount = localStorage.getItem('clickCount');
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clickCount', count.toString());
  }, [count]);

  function handleClick() {
    setCount(prevCount => prevCount + 1);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 200); // Adjust the delay as needed
  }

  return (
    <div style={styles.buttonContainer}>
      <div style={styles.counter}>Clicked {count} times</div>
      <button
        style={{ ...styles.button, ...(clicked && styles.buttonClicked) }}
        onClick={handleClick}
      >
        Click me
      </button>
    </div>
  );
}

export default MyButton;