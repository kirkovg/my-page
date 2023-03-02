import { useEffect, useRef, useState } from 'react';
import './Terminal.css';
import { TerminalRow } from './TerminalRow';

const defaultState: ITerminalState = {
  rows: [
    {
      id: 1,
      type: 'COMMAND',
      active: true,
      value: '',
    },
  ],
};

const createNewEmptyCommand = (currentId: number): ITerminalRow => {
  return {
    id: currentId + 1,
    type: 'COMMAND',
    active: true,
    value: '',
  };
};

const createCommandsBasedOnAction = (executedCommand: ITerminalRow, currentId: number): ITerminalRow[] => {
  switch (executedCommand.value) {
    case 'help': {
      return [
        {
          id: currentId + 1,
          active: false,
          type: 'CUSTOM_TEXT',
          value: 'These are the following commands which can be used:',
        },
        {
          id: currentId + 2,
          active: false,
          type: 'CUSTOM_TEXT',
          value: '  clear     -  clear the terminal screen',
        },
        {
          id: currentId + 3,
          active: false,
          type: 'CUSTOM_TEXT',
          value: '  cv        -  prints out my work experience',
        },
        {
          id: currentId + 4,
          active: false,
          type: 'CUSTOM_TEXT',
          value: `  tech      -  prints out the technologies I've worked with`,
        },
        {
          id: currentId + 5,
          active: false,
          type: 'CUSTOM_TEXT',
          value: `  social    -  social media presence`,
        },
      ];
    }
    default:
      return [
        {
          id: currentId + 1,
          active: false,
          type: 'CUSTOM_TEXT',
          value: `Command '${executedCommand.value}' not found. Run 'help' to see the available commands.`,
        },
      ];
  }
};

const generateNewRows = (terminalState: ITerminalState, executedCommand: ITerminalRow): ITerminalRow[] => {
  if (executedCommand.value === 'clear') {
    return defaultState.rows;
  }

  const newRows = [
    ...terminalState.rows.filter(c => c.id !== executedCommand.id),
    {
      ...executedCommand,
      active: false,
    },
    ...createCommandsBasedOnAction(executedCommand, terminalState.rows.length),
  ];

  newRows.push(createNewEmptyCommand(newRows.length));
  newRows.sort((a, b) => a.id - b.id);

  return newRows;
};

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
