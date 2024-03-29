import React from "react";
import ExamDetailsTable from "./components/ExamDetailsTable";
import { columnsDataComplex } from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";

const ExamDetails = () => {
  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
      <ExamDetailsTable
        columnsData={columnsDataComplex}
        tableData={tableDataComplex}
      />
    </div>
  );
};

export default ExamDetails;
