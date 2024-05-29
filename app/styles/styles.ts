import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  counter: {
    marginBottom: '10px',
    fontSize: '20px',
  },
  button: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonClicked: {
    backgroundColor: '#0056b3',
  }
}