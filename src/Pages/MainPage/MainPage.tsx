import React from "react";
import DataGridTable from "../../Components/DataGridTable/DataGridTable";
import Departments from "../../Components/Departments/Departments";

export const MainPage: React.FC = () => {
  return (
    <>
      <DataGridTable />
      <Departments />
    </>
  );
};
