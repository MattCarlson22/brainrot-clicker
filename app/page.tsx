'use client';

import React from 'react';
import MyButton from './components/MyButton';
import { styles } from './styles/styles';

export default function Home() {
  return (
    <div style={styles.container}>
      <MyButton />
    </div>
  );
}