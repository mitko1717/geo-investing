import { FC } from "react";
import { TableColsProps } from "./interfaces";

const TableCols: FC<TableColsProps> = ({
  divForNews,
  spanTime,
  spanSymbol,
  spanCategory,
  spanNews,
}) => {
  return (
    <div className={divForNews}>
      <span style={{ color: "#9AA0A6" }} className={spanTime}>
        Time
      </span>
      <span style={{ color: "#9AA0A6" }} className={spanSymbol}>
        Symbol
      </span>
      <span style={{ color: "#9AA0A6" }} className={spanCategory}>
        Category
      </span>
      <span style={{ color: "#9AA0A6" }} className={spanNews(false)}>
        News
      </span>
    </div>
  );
};

export default TableCols;
