import { useEffect, useRef, useState } from 'react';
import { defaultState, generateNewRows, updateCommandValue } from './utils/rowManager';
import './Terminal.css';
import { TerminalRow } from './TerminalRow/TerminalRow';

export function Terminal() {
  const [terminalState, setTerminalState] = useState<ITerminalState>(defaultState);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef) {
      ((terminalRef.current?.lastChild as HTMLDivElement)?.lastChild as HTMLInputElement)?.focus();
    }
  }, [terminalState]);

  return (
    <div className="terminal" ref={terminalRef}>
      <p>
        Welcome to the home page of Software Engineer <strong>Gjorgji Kirkov</strong>! Execute the 'help' command to get
        started.
      </p>
      <>
        {terminalState.rows.map((r) => (
          <TerminalRow
            key={r.id}
            row={r}
            updateCommandValue={(value, rowId) => updateCommandValue(value, rowId, terminalState, setTerminalState)}
            commandEntered={(row) =>
              setTerminalState({
                rows: generateNewRows(terminalState, row),
              })
            }
          />
        ))}
      </>
    </div>
  );
}
