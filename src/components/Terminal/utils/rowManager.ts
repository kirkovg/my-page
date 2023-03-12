import { generateTextForCv } from './rowConfig/cvText';
import { generateTextForHelp } from './rowConfig/helpText';
import { generateTextForSocial } from './rowConfig/socialText';
import { generateTextForTechnologies } from './rowConfig/techText';

export const defaultState: ITerminalState = {
  rows: [
    {
      id: 0,
      type: 'COMMAND',
      active: true,
      value: '',
    },
  ],
};

export const generateNewRows = (terminalState: ITerminalState, executedCommand: ITerminalRow): ITerminalRow[] => {
  if (executedCommand.value === 'clear') {
    return defaultState.rows;
  }

  const newRows = [
    ...terminalState.rows.filter((c) => c.id !== executedCommand.id),
    {
      ...executedCommand,
      active: false,
    },
    ...createCommandsBasedOnAction(executedCommand, terminalState.rows.length - 1),
  ];

  newRows.push(createNewEmptyCommand(newRows.length - 1));
  sortRows(newRows);

  return newRows;
};

export const updateCommandValue = (
  newValue: string,
  currentCommandId: number,
  terminalState: ITerminalState,
  terminalStateSetter: React.Dispatch<React.SetStateAction<ITerminalState>>,
): void => {
  const trimmed = newValue.trim();
  const currentCommand = terminalState.rows.find((r) => r.id === currentCommandId);

  if (!currentCommand) {
    throw new Error('Should not happen!');
  }

  if (!trimmed) {
    terminalStateSetter({
      rows: sortRows([
        ...terminalState.rows.filter((r) => r.id !== currentCommandId),
        {
          ...currentCommand,
          value: '',
        },
      ]),
    });
  } else {
    terminalStateSetter({
      rows: sortRows([
        ...terminalState.rows.filter((r) => r.id !== currentCommandId),
        {
          ...currentCommand,
          value: newValue,
        },
      ]),
    });
  }
};

const createCommandsBasedOnAction = (executedCommand: ITerminalRow, currentId: number): ITerminalRow[] => {
  switch (executedCommand.value) {
    case 'help': {
      return generateTextForHelp(currentId);
    }
    case 'social': {
      return generateTextForSocial(currentId);
    }
    case 'tech': {
      return generateTextForTechnologies(currentId);
    }
    case 'cv': {
      return generateTextForCv(currentId);
    }
    case '': {
      return [];
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

const createNewEmptyCommand = (currentId: number): ITerminalRow => {
  return {
    id: currentId + 1,
    type: 'COMMAND',
    active: true,
    value: '',
  };
};

const sortRows = (rows: ITerminalRow[]): ITerminalRow[] => {
  return rows.sort((a, b) => a.id - b.id);
};
