export const defaultState: ITerminalState = {
  rows: [
    {
      id: 1,
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

const createCommandsBasedOnAction = (executedCommand: ITerminalRow, currentId: number): ITerminalRow[] => {
  switch (executedCommand.value) {
    case 'help': {
      return generateTextForHelp(currentId);
    }
    case 'social': {
      return generateTextForSocial(currentId);
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

const generateTextForHelp = (currentId: number): ITerminalRow[] => {
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
      value: '  cv        -  prints out my work experience',
    },
    {
      id: currentId + 3,
      active: false,
      type: 'CUSTOM_TEXT',
      value: `  tech      -  prints out the technologies I've worked with`,
    },
    {
      id: currentId + 4,
      active: false,
      type: 'CUSTOM_TEXT',
      value: `  social    -  social media presence`,
    },
    {
      id: currentId + 5,
      active: false,
      type: 'CUSTOM_TEXT',
      value: '  clear     -  clear the terminal screen',
    },
  ];
};

const generateTextForSocial = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      value: '  Github       -  ',
      href: 'https://github.com/kirkovg',
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      value: '  LinkedIn     -  ',
      href: 'https://www.linkedin.com/in/gjorgji-kirkov/',
    },
  ];
};

const createNewEmptyCommand = (currentId: number): ITerminalRow => {
  return {
    id: currentId + 1,
    type: 'COMMAND',
    active: true,
    value: '',
  };
};
