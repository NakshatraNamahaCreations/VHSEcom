import React from "react";
import { Tabldata, customStyles } from "./data";
import DataTable from "react-data-table-component";

export default function CustomerView() {
  const columns = [
    {
      name: "INVOICE NO",
      selector: (row) => row["INVOICE NO"],
    },
    {
      name: "ORDER TIME",
      selector: (row) => row["ORDER TIME"],
    },
    {
      name: "CUSTOMER NAME",
      selector: (row) => row["CUSTOMER NAME"],
    },
    {
      name: "METHOD",
      selector: (row) => row["METHOD"],
    },
    {
      name: "AMOUNT",
      selector: (row) => row["AMOUNT"],
    },
    {
      name: "STATUS",
      selector: (row) => row["STATUS"],
    },
  ];
  return (
    <div>
      <h4>Customer Order list</h4>
      <div className="row mt-5">
        <DataTable
          columns={columns}
          data={Tabldata}
          highlightOnHover
          pointerOnHover
          pagination
          selectableRows
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
