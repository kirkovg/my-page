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
      value: `  tech      -  prints out the technologies I am working with`,
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

const generateTextForTechnologies = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      value: '  Programming Languages         - Javascript/Typescript, Java, SQL, HTML, CSS',
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        '  Technologies & Frameworks     - Node.js, React.js, Next.js, Angular, Spring, git, Docker, K8s, GraphQL, Postman, Gitlab/Github',
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

const sortRows = (rows: ITerminalRow[]): ITerminalRow[] => {
  return rows.sort((a, b) => a.id - b.id);
};
