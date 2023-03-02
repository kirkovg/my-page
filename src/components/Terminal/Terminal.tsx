import { useEffect, useRef, useState } from 'react';
import { defaultState, generateNewRows } from './rowGenerator';
import './Terminal.css';
import { TerminalRow } from './TerminalRow';

export function Terminal() {
  const [terminalState, setTerminalState] = useState<ITerminalState>(defaultState);

  const terminalRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: ITerminalRow) => {
    setTerminalState({
      rows: generateNewRows(terminalState, command),
    });
  };

  useEffect(() => {
    if (terminalRef) {
      ((terminalRef.current?.lastChild as HTMLDivElement).lastChild as HTMLInputElement)?.focus();
    }
  }, [terminalState]);

  const setCommandValue = (value: string, commandId: number) => {
    const trimmed = value.trim();
    const currentCommand = terminalState.rows.find(r => r.id === commandId);

    if (!currentCommand) {
      throw new Error('Should not happen!');
    }

    if (!trimmed) {
      setTerminalState({
        rows: [
          ...terminalState.rows.filter(r => r.id !== commandId),
          {
            ...currentCommand,
            value: '',
          },
        ].sort((a, b) => a.id - b.id),
      });
    } else {
      setTerminalState({
        rows: [
          ...terminalState.rows.filter(r => r.id !== commandId),
          {
            ...currentCommand,
            value,
          },
        ].sort((a, b) => a.id - b.id),
      });
    }
  };

  return (
    <div className="terminal" ref={terminalRef}>
      <p>Welcome to the home page of Gjorgji Kirkov! Execute the 'help' command to get started.</p>
      <>
        {terminalState.rows.map(r => (
          <TerminalRow key={r.id} row={r} updateCommandValue={setCommandValue} commandEntered={executeCommand} />
        ))}
      </>
    </div>
  );
}
