type TableData = {
  fields: string[];
};
type TableRowProps = {
  tableData: TableData;
  onClick: () => void;
};
const DefaultTableRow = ({ tableData, onClick }: TableRowProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-full py-2 px-2 flex gap-4 items-center cursor-pointer ${
        true == true ? "bg-slate-100" : ""
      } hover:bg-slate-100 bg-transparent border-b border-b-gray-100 transition-all`}
    ></div>
  );
};

export default DefaultTableRow;
