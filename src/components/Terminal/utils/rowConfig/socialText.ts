export const generateTextForSocial = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'GitHub',
      href: 'https://github.com/kirkovg',
      bold: true,
      listItem: true,
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'LinkedIn',
      listItem: true,
      bold: true,
      href: 'https://www.linkedin.com/in/gjorgji-kirkov/',
    },
  ];
};
