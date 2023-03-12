export const generateTextForHelp = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'These are the following commands which can be used:',
      bold: true,
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'cv - prints out my work experience',
    },
    {
      id: currentId + 3,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'tech - prints out the technologies I am working with',
    },
    {
      id: currentId + 4,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'social - social media presence',
    },
    {
      id: currentId + 5,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'clear - clear the terminal screen',
    },
    {
      id: currentId + 6,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'help - prints this help text output',
    },
  ];
};
