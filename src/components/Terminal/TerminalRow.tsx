import { useState } from 'react';
import './TerminalRow.css';

type TerminalRowProps = {
  row: ITerminalRow;
  updateCommandValue: (value: string, rowId: number) => void;
  commandEntered: (row: ITerminalRow) => void;
};

export function TerminalRow({ row, updateCommandValue, commandEntered }: TerminalRowProps) {
  return (
    <input
      id={row.id.toString()}
      type="text"
      className="terminal-row"
      value={row.value}
      onKeyUp={e => {
        if (e.key === 'Enter') {
          commandEntered(row);
        }
      }}
      onChange={e => {
        if (row.active) {
          updateCommandValue(e.target.value, row.id);
        }
      }}
    />
  );
}
