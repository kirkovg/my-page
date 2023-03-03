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
        <input
          id={row.id.toString()}
          type="text"
          readOnly={!row.active}
          defaultValue={row.value}
          className={`terminal-row-input ${row.href ? 'input-with-href' : ''}`}
        />
        {row.href && (
          <a href={row.href} target="_blank">
            {row.href}
          </a>
        )}
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
        readOnly={!row.active}
        className="terminal-row-input"
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
