// styles.ts

import { CSSProperties } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Press_Start_2P } from 'next/font/google';

const press_start_2P = Press_Start_2P({ subsets: ['latin'], weight: "400" });

const fallAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const rainbowAnimation = keyframes`
  0% { color: red; }
  14% { color: orange; }
  28% { color: yellow; }
  42% { color: green; }
  57% { color: blue; }
  71% { color: indigo; }
  85% { color: violet; }
  100% { color: red; }
`;

export const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: `${press_start_2P.style.fontFamily}`,
    fontSize: 10,
  },
  header: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '24px',
    zIndex: 1,
    animation: '2s linear infinite',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cpsCounter: {
    marginBottom: '10px',
    fontSize: '20px',
    color: '#FFFFFF',
  },
  counter: {
    marginBottom: '10px',
    fontSize: '20px',
    color: '#FFFFFF',
  },
  button: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'transform 0.1s, background-color 0.3s',
    backgroundImage: 'url(/grimace-shake.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  buttonHovered: {
    transform: 'scale(0.95)',
  },
  buttonClicked: {
    transform: 'scale(1.05)',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100vh',
    padding: '20px',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderLeft: '1px solid #444444',
    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
  },
  item: {
    width: '200px',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #444444',
    borderRadius: '5px',
    backgroundColor: '#555555',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonBuyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  buttonBuy: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textAlign: 'center',
  },
  buttonBuyDisabled: {
    backgroundColor: '#d9534f', // light red when disabled
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '50%',
    cursor: 'not-allowed',
    textAlign: 'center',
  },
  buttonBuyEnabled: {
    backgroundColor: '#5cb85c', // light green when enabled
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '50%',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export const FallingShake = styled.div`
  position: absolute;
  top: 0; /* Start from the top */
  width: 50px;
  height: 50px;
  background-image: url(/grimace-shake.png);
  background-size: cover;
  background-position: center;
  animation: ${fallAnimation} 3s linear;
  z-index: -1;
`;

export const RainbowHeader = styled.div`
  animation: ${rainbowAnimation} 2s linear infinite;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 1;
`;
