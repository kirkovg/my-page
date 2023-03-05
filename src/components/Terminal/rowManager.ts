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
        '  Technologies & Frameworks     - Node.js, React.js, Next.js, Angular, Spring, git, Docker, K8s, GraphQL, RabbitMQ, Postman, Gitlab/Github',
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

const generateTextForCv = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Experience',
      bold: true,
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Bright Marbles | Senior Software Engineer             Skopje, North Macedonia (January 2022 - present)',
    },
    {
      id: currentId + 3,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        ' * Working on the development of a platform for buying & registration of domain names, email, web hosting & web shop products serving 1M+ of domains',
    },
    {
      id: currentId + 4,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        ' * Led the web frontend development of an MVP of a web 3.0, fan-first, e-commerce platform revolutionizing the live event experience',
    },
    createEmptyRow(currentId + 5),
    {
      id: currentId + 6,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        'Netcetera | Senior Software Engineer                  Skopje, North Macedonia (November 2017 - January 2022)',
    },
    {
      id: currentId + 7,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        ' * Co-led the frontend development of a real estate evaluation platform for the DACH region, reducing the evaluation process in just a few clicks',
    },
    {
      id: currentId + 8,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        ' * Provided technical expertise & reviews for the web frontend tech stack on a Swiss-based financial planning platform',
    },
    createEmptyRow(currentId + 9),
    {
      id: currentId + 10,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        'Netcetera | Software Engineering Intern               Ohrid, North Macedonia (July 2017 - September 2017)',
    },
    {
      id: currentId + 11,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        ' * Worked on the development and extensions of the Web Service API of a real estate valuation platform for the DACH region',
    },
    createEmptyRow(currentId + 12),
    createEmptyRow(currentId + 13),
    {
      id: currentId + 14,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Education',
      bold: true,
    },
    {
      id: currentId + 15,
      active: false,
      type: 'CUSTOM_TEXT',
      value:
        'University of St. Cyril and Methodius                 Skopje, North Macedonia (September 2014 - October 2018)',
    },
    {
      id: currentId + 16,
      active: false,
      type: 'CUSTOM_TEXT',
      value: ' * BSc. in Computer Science and Engineering; Special focus on scalable web application development',
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

const createEmptyRow = (id: number): ITerminalRow => {
  return {
    id,
    active: false,
    type: 'CUSTOM_TEXT',
    value: '',
  };
};

const sortRows = (rows: ITerminalRow[]): ITerminalRow[] => {
  return rows.sort((a, b) => a.id - b.id);
};
