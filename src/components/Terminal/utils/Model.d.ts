type ITerminalState = {
  rows: ITerminalRow[];
};

type ITerminalRow = {
  id: number;
  active: boolean;
  value: string;
  type: 'COMMAND' | 'CUSTOM_TEXT';
  href?: string;
  bold?: boolean;
  listItem?: boolean;
  header?: boolean;
  spacingTop?: boolean;
};
