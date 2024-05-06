import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import { Button, Card } from "react-bootstrap";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";

export default function Invoice() {
  const invoiceContainerRef = useRef(null);
  const columns = [
    {
      name: "SR",
      selector: (row) => row["SR"],
    },
    {
      name: "PRODUCT TITLE",
      selector: (row) => row["PRODUCT TITLE"],
    },
    {
      name: "QUANTITY",
      selector: (row) => row["QUANTITY"],
    },
    {
      name: "ITEM PRICE",
      selector: (row) => row["ITEM PRICE"],
    },
    {
      name: "AMOUNT",
      selector: (row) => row["AMOUNT"],
    },
  ];

  const data = [
    {
      id: 1,
      SR: 1,
      "PRODUCT TITLE": "Calabaza Squash",
      QUANTITY: 6,
      "ITEM PRICE": "98.03",
      AMOUNT: "470.97",
    },
  ];

  const handleDownload = () => {
    const invoiceContainer = invoiceContainerRef.current;

    html2canvas(invoiceContainer, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );

        saveAs(pdf.output("blob"), "invoice.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceContainerRef.current,
  });
  return (
    <div className="row">
      {" "}
      <p className="m-auto text-center">Invoice</p>
      <div
        className="col-md-10 p-2 m-auto invoice mt-5 "
        ref={invoiceContainerRef}
      >
        <div className="row p-2">
          <div className="col-md-4">
            <div className="row">
              <h3>INVOICE</h3>
              <p>Status Processing</p>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="row m-auto invoice-headi text-end ">
              <p className="m-0"> BILLED BY</p>
              <span> Vijay Home Services</span>
            </div>
            <div className="row text-end">
              Vijay Home Services #1/1, 2nd Floor, Shamraj building MN
              Krishnarao Road Mahadevapura Outer Ring Road, Banglore 560048 GSTN
              : 29EIXPK0545M1ZE
            </div>
          </div>
        </div>
        <div className="row mt-3 p-2">
          <div className="row">
            <div className="col-md-4">
              <p className="invoice-headi">Date</p>
            </div>
            <div className="col-md-4">
              <p className="invoice-headi ">Invoice No</p>
            </div>
            <div className="col-md-4 text-end">
              <p className="row  invoice-headi float-end">Invoice To</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p className="row m-auto">9 March 3</p>
            </div>
            <div className="col-md-4">
              <p className="row m-auto">#88734</p>
            </div>
            <div className="col-md-4 text-end">
              <p className="row m-auto">
                sagar Thakur sagarthakusdfsdfr6947@gmail.com 234234324 This is
                testing Bhopal, India, 462003
              </p>
            </div>
          </div>
        </div>

        <div className="row p-2">
          <DataTable
            title="Order List"
            columns={columns}
            data={data}
            highlightOnHover
            pointerOnHover
          />
        </div>
        <div className="row shadow-none p-3 mt-5 bg-light rounded  m-auto">
          <div className="row p-2">
            <div className="col-md-3 m-auto">Payment Method</div>
            <div className="col-md-2 m-auto">Shipping Cost</div>
            <div className="col-md-2 m-auto">Discount</div>
            <div className="col-md-2 m-auto">Total Amount</div>
          </div>
          <div className="row p-2">
            <div className="col-md-3 m-auto">Cash</div>
            <div className="col-md-2 m-auto">1500</div>
            <div className="col-md-2 m-auto">4%</div>
            <div className="col-md-2 m-auto">1000</div>
          </div>
        </div>
      </div>
      <div className="row m-auto mt-5 p-2">
        <Button
          className="col-md-3 m-auto"
          variant="success"
          onClick={handleDownload}
        >
          Download invoice <i className="pi pi-cloud-download m-auto"></i>
        </Button>

        <Button
          className="col-md-2 m-auto"
          variant="success"
          onClick={handlePrint}
        >
          Print invoice <i className="pi pi-print m-auto"></i>
        </Button>
      </div>
    </div>
  );
}
