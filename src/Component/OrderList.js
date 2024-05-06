import React, { useRef, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Card } from "react-bootstrap";
import { Tabldata, customStyles } from "./data";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderList() {
  const invoiceContainerRef = useRef(null);
  const [allorderdata, setallorderdata] = useState([]);

  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/api/orderlist/getallorderlistdata"
      );
      if (response.status === 200) {
        setallorderdata(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("allorderdata======", allorderdata);

  const navigate = useNavigate();
  const deleteuser = () => {};
  const edit = () => {};
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
  const handleInvoice = (id) => {
    navigate("/Invoice", { state: id });
  };
  const columns = [
    {
      name: "INVOICE NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "ORDER Date",
      selector: (row) => row.date,
    },
    {
      name: "CUSTOMER NAME",
      selector: (row) => row.address,
    },
    {
      name: "METHOD",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.totalamount,
    },
    {
      name: "STATUS",
      selector: (row) => row.productStatus,
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
  return (
    <div className="row m-auto">
      <div className="row ">
        <p className="headeingName">Order</p>
        <Card className=" shadow-sm p-5  m-auto  bg-white rounded m-auto">
          <div className="row">
            <div className="col-md-3">
              <Form.Control className="p-2" placeholder="Seach by customer" />
            </div>
            <div className="col-md-3">
              <Form.Select size="sm" className="p-2">
                <option>Delivered</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Cancel</option>
              </Form.Select>
            </div>
            <div className="col-md-3">
              <Form.Select className="p-2">
                <option disabled>Method</option>
                <option>Cash</option>
                <option>Card</option>
                <option>Credit</option>
              </Form.Select>
            </div>
            <div className="col-md-3">
              <button className="p-2 m-auto btn_bg">Download All orders</button>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" />
            </div>
            <div className="col-md-8">
              {" "}
              <div className="row">
                <Form.Label>End Date</Form.Label>
                <div className="col-md-6">
                  <Form.Control type="date" />
                </div>
                <button className="col-md-2  p-1 m-auto btn_bg">Filter</button>
                <button className="col-md-2  p-1 m-auto btn_bg">Reset</button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="row mt-5" ref={invoiceContainerRef}>
        <DataTable
          columns={columns}
          data={allorderdata}
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
