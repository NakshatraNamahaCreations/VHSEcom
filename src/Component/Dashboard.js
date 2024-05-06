import React, { useRef, useEffect } from "react";

import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Column } from "@ant-design/charts";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import { useReactToPrint } from "react-to-print";
import { Chart } from "react-google-charts";
import { Tabldata, customStyles } from "./data";
import "./dash.css";
export default function Dashboard() {
  const navigate = useNavigate();
  const invoiceContainerRef = useRef(null);
  let cartdata = [
    {
      bgcolor: "#f39c12",
      category: "Orders",
      TotalAmount: "",
      cash: "",
      credit: "",
      card: "",
      iconss: ShoppingCartIcon,
      TotalNumber: 32483,
    },
    {
      bgcolor: "#63bff5",
      category: "Product",
      TotalAmount: "",
      cash: "",
      credit: "",
      card: "",
      iconss: InventoryIcon,
      TotalNumber: 32483,
    },
    {
      bgcolor: "#dd4b39",
      category: "Customers",
      TotalAmount: "",
      cash: "",
      credit: "",
      card: "",
      iconss: Groups2OutlinedIcon,
      TotalNumber: 32483,
    },
    {
      bgcolor: "#00a65a",
      category: "Sales",
      TotalAmount: "",
      iconss: TrendingUpOutlinedIcon,
      TotalNumber: 32483,
    },
  ];

  let chartData = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  let config = {
    data: chartData,
    yField: "value",
    xField: "year",
  };

  useEffect(() => {
    if (invoiceContainerRef.current) {
      const dataTableContainer =
        invoiceContainerRef.current.querySelector(".rdt_Table");
      if (dataTableContainer) {
        dataTableContainer.classList.add("printableDataTable");
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => invoiceContainerRef.current,
  });
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
    {
      name: "ACTION",
      selector: (row) => (
        <Form.Select size="sm">
          <option>Delivered</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Cancel</option>
        </Form.Select>
      ),
    },

    {
      name: "INVOICE",
      selector: (row) => (
        <div className="row">
          <i
            onClick={handlePrint}
            className="pi pi-print prints col-md-2 m-auto"
          ></i>
          <span
            className="view m-auto col-md-6"
            onClick={() => handleInvoice(row.id)}
          >
            View
          </span>
        </div>
      ),
    },
  ];
  const handleInvoice = (id) => {
    navigate("/Invoice", { state: id });
  };

  const data = [
    ["Order", "Per day"],
    ["delivered", 11],
    ["pending", 2],
    ["process", 2],
    ["cancel", 2],
  ];

  const options = {
    title: "Order",
    is3D: true,
  };

  return (
    <div className="row ">
      <div className="row m-auto mt-3">
        {cartdata?.map((ele) => (
          <Card
            key={ele}
            text={ele.bgcolor.toLowerCase() === "light" ? "dark" : "white"}
            style={{
              width: "16rem",
              height: "120PX",
              backgroundColor: ele.bgcolor,
            }}
            className="m-auto mb-2 glassBox"
          >
            <Card.Body>
              <div className="row">
                <div className="col-md-6 ">
                  <Card.Title>{ele.TotalNumber}</Card.Title>
                  <Card.Text>{ele.category}</Card.Text>
                </div>
                <div className="col-md-6 glassBox__imgBox">
                  <ele.iconss className="icons" />
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
       
      </div>
      <div className="row">
        <div className="col-md-6">
          <Column {...config} layout="vertical" />
        </div>
        <div className="col-md-6">
          {" "}
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
      <p>Recent Order</p>
      <div ref={invoiceContainerRef}>
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
