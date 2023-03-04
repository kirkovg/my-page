import { Terminal } from './components/Terminal/Terminal';
import './App.css';
import { useEffect } from 'react';

function App() {
  const focusOnLastInput = () => {
    const rowIndex = document.querySelectorAll('.terminal-row').length - 1;
    const lastInput = document.querySelector('#row-' + rowIndex.toString()) as HTMLInputElement;
    lastInput?.focus();
  };

  useEffect(() => {
    document.body.addEventListener('click', focusOnLastInput);

    return () => {
      document.body.removeEventListener('click', focusOnLastInput);
    };
  }, []);

  return (
    <div className="App">
      <Terminal />
    </div>
  );
}

export default App;
