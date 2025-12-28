interface TableColumn {
  header: string;
  accessor: string;
  className?: string;
}

interface Props {
  columns: TableColumn[];
  data: any[];
  renderRow: (row: any, index: number) => React.ReactNode;
}

const Table = ({ columns, data, renderRow }: Props) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>{col.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>{data.map((row, index) => renderRow(row, index))}</tbody>
    </table>
  );
};

export default Table;
