'use client';

import { useState } from "react";


export default function Home() {
  return (
    <>
      <h1>test</h1>
      <MyButton />
    </>
  );
}

const MyButton = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}