import './TerminalRow.css';

type TerminalRowProps = {
  row: ITerminalRow;
  updateCommandValue: (value: string, rowId: number) => void;
  commandEntered: (row: ITerminalRow) => void;
};

export function TerminalRow({ row, updateCommandValue, commandEntered }: TerminalRowProps) {
  if (row.type === 'CUSTOM_TEXT') {
    return (
      <div className="terminal-row">
        <input id={row.id.toString()} type="text" defaultValue={row.value} />
      </div>
    );
  }

  return (
    <div className="terminal-row">
      <span>&gt;&nbsp;</span>
      <input
        id={row.id.toString()}
        type="text"
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
    </div>
  );
}
