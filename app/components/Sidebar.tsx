// Sidebar.tsx
import React from 'react';
import { styles } from '../styles/styles';

type ItemKeys = 'placeholder1' | 'placeholder2' | 'placeholder3';

interface SidebarProps {
  clicks: number;
  items: { [key in ItemKeys]: number };
  prices: { [key in ItemKeys]: number };
  buyItem: (item: ItemKeys) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ clicks, items, prices, buyItem }) => {
  return (
    <div style={styles.sidebar}>
      {(['placeholder1', 'placeholder2', 'placeholder3'] as ItemKeys[]).map((item, index) => (
        <div key={item} style={styles.item}>
          <h3>Placeholder {index + 1}</h3>
          <p>Price: {prices[item]} Clicks</p>
          <p>Owned: {items[item]}</p>
          <div style={styles.buttonBuyContainer}>
            <button
              style={
                clicks >= prices[item]
                  ? styles.buttonBuyEnabled
                  : styles.buttonBuyDisabled
              }
              onClick={() => buyItem(item)}
              disabled={clicks < prices[item]}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
