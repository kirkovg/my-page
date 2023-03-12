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
        {row.value && !row.header && !row.listItem && (
          <p id={'row-' + row.id.toString()} className={`terminal-row-input ${row.bold ? 'bold' : ''}`}>
            {row.value}
          </p>
        )}
        {row.header && (
          <h2 className={`terminal-row-input header ${row.spacingTop ? 'spacing-top' : ''}`}>{row.value}</h2>
        )}
        {row.listItem && row.href && (
          <li className="terminal-row-input">
            <a href={row.href} target="_blank">
              {row.value}
            </a>
          </li>
        )}
        {row.listItem && !row.href && <li className="terminal-row-input">{row.value}</li>}
        {row.href && !row.listItem && (
          <a href={row.href} target="_blank">
            {row.value}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="terminal-row">
      <span>&gt;&nbsp;</span>
      <input
        id={'row-' + row.id.toString()}
        type="text"
        value={row.value}
        readOnly={!row.active}
        className="terminal-row-input"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            commandEntered(row);
          }
        }}
        onChange={(e) => {
          if (row.active) {
            updateCommandValue(e.target.value, row.id);
          }
        }}
      />
    </div>
  );
}
