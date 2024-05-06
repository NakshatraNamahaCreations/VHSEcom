import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Form, Button, Card } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { ProductData, customStyles } from "./data";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import { ImageApiURL } from "../../src/path";

export default function Product() {
  const [showProduct, setshowProduct] = useState(false);
  const [editProduct, seteditProduct] = useState(false);
  const invoiceContainerRef = useRef(null);
  const navigate = useNavigate();
  const deleteuser = () => {};
  const edit = (id) => {};

  const handleDetails = (id) => {
    navigate("/PrductView", { state: { id: id } });
  };
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [productname, setproductname] = useState("");
  const [hsncode, sethsncode] = useState("");
  const [offerprice, setofferprice] = useState("");
  const [price, setprice] = useState("");
  const [offer, setoffer] = useState("");
  const [selectapp, setselectapp] = useState("");
  const [description, setdescription] = useState("");
  const [deliverycharge, setdeliverycharge] = useState("");
  const [productimage, setproductimage] = useState("");
  const [allproduct, setallproduct] = useState([]);
  const [searchproduct, setsearchproduct] = useState("");
  const [productobject, setproductobject] = useState({});

  const handlerowedit = (row) => {
    seteditProduct(true);
    setproductobject(row);
  };

  console.log("productimage====", productimage);

  const filterdata = allproduct.filter((item) =>
    item.productname.toLowerCase().includes(searchproduct.toLowerCase())
  );

  const Addproduct = async () => {
    if (!category || !subcategory) {
      alert("Please fill all fields");
    } else {
      const formdata = new FormData();
      formdata.append("category", category);
      formdata.append("subcategory", subcategory);
      formdata.append("productname", productname);
      formdata.append("hsncode", hsncode);
      formdata.append("offerprice", offerprice);
      formdata.append("price", price);
      formdata.append("offer", offer);
      formdata.append("selectapp", selectapp);
      formdata.append("description", description);
      formdata.append("deliverycharge", deliverycharge);
      formdata.append("productimage", productimage);
      try {
        let config = {
          url: "product/addproduct",
          method: "post",
          baseURL: "http://localhost:8002/api",
          data: formdata,
          headers: { "content-type": "multipart/form-data" },
        };
        await axios(config).then(function (res) {
          if (res.status === 200) {
            console.log("success", res);
            alert(res.data.success);
            window.location.assign("/Product");
          }
        });
      } catch (error) {
        console.log(error);
        alert("not able to complete");
      }
    }
  };

  const Editproduct = async () => {
    const formdata = new FormData();
    formdata.append("category", category);
    formdata.append("subcategory", subcategory);
    formdata.append("productname", productname);
    formdata.append("hsncode", hsncode);
    formdata.append("offerprice", offerprice);
    formdata.append("price", price);
    formdata.append("offer", offer);
    formdata.append("selectapp", selectapp);
    formdata.append("description", description);
    formdata.append("deliverycharge", deliverycharge);
    formdata.append("productimage", productimage);
    try {
      let config = {
        url: `product/updateproductById/${productobject._id}`,
        method: "put",
        baseURL: "http://localhost:8002/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success", res);
          alert(res.data.success);
          window.location.assign("Product");
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  const [CategoryData, setCategoryData] = useState([]);
  const [SubcategoryData, setSubcategoryData] = useState([]);

  useEffect(() => {
    getcategory();
    getSubcategory();
    getallproduct();
  }, []);

  const getallproduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/api/product/getallproduct"
      );
      if (response.status === 200) {
        setallproduct(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("allproduct====", allproduct);

  const getcategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/api/category/getallcategory"
      );
      if (response.status === 200) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getSubcategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/api/subcat/getsubcategory"
      );
      if (response.status === 200) {
        setSubcategoryData(response.data.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.log("CategoryData=====", CategoryData);
  console.log("SubcategoryData=====", SubcategoryData);

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.category,
    },

    {
      name: "Subcategory Name",
      selector: (row) => row.subcategory,
    },
    {
      name: "Product Name",
      selector: (row) => row.productname,
    },

    {
      name: "ProductImage",
      selector: (row) => (
        <>
          <img
            width={20}
            height={20}
            src={`${ImageApiURL}/Product/${row?.productimage}`}
          />
        </>
      ),
    },

    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Offer Price",
      selector: (row) => row.offerprice,
    },
    {
      name: "Offer",
      selector: (row) => row.offer,
    },
    {
      name: "HSN Code",
      selector: (row) => row.hsncode,
    },

    {
      name: "ACTION",
      selector: (row) => (
        <div className="row">
          <span
            className="hyperlink col-md-3"
            onClick={() => handlerowedit(row)}
            style={{ cursor: "pointer" }}
          >
            <i
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
            |{" "}
          </span>
          <a
            onClick={() => deleteproduct(row._id)}
            className="hyperlink mx-1 col-md-3"
          >
            <i
              class="fa fa-trash"
              title="Delete"
              style={{ color: "#dc3545" }}
            ></i>
          </a>{" "}
          |
          <a
            onClick={() => handleDetails(row.id)}
            className="hyperlink mx-1 col-md-3"
          >
            <i
              className="pi pi-eye"
              title="view"
              style={{ color: "#63bff5" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];

  const deleteproduct = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:8002/api/product/deleteproductById/${data}`
      );

      if (res.status === 200) {
        console.log(res.data);
        alert(res.data.success);
        getallproduct();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Cannot perform the operation");
    }
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
  const handleInvoice = (id) => {
    navigate("/Invoice", { state: id });
  };
  const handleSubmit = () => {};

  return (
    <>
      <Card className=" mt-4 p-3">
        <div className="row">
          <div className="col-md-10 m-auto"></div>

          <button
            onClick={() => setshowProduct(true)}
            className="col-md-2 btn_bg p-2 m-auto float-end"
          >
            <i className="pi pi-plus"></i> Add Product
          </button>
        </div>
      </Card>

      <div className="row mt-4">
        <div className="col-md-9"></div>
        <div className="col-md-3 m-auto float-end">
          <Form.Control
            className=""
            placeholder="Search Product..."
            onChange={(e) => setsearchproduct(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        className="mt-3"
        columns={columns}
        data={filterdata}
        highlightOnHover
        pointerOnHover
        pagination
        selectableRows
        bordered
        customStyles={customStyles}
      />
      <Offcanvas
        show={showProduct}
        onHide={() => setshowProduct(false)}
        placement="end"
        className="offcan"
      >
        <Offcanvas.Header className="col-md-12 ofheader">
          <div className="title ">
            <div>
              <Offcanvas.Title className=""> Add Product</Offcanvas.Title>
              <p>Embed Your Product Product and Crucial Details Instantly</p>
            </div>
            <button onClick={() => setshowProduct(false)} className="closebtn ">
              x
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mb-3">
            <div className="col-md-4 ">
              <Form.Label> Category</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                size="sm"
                onChange={(e) => setcategory(e.target.value)}
              >
                {CategoryData?.map((ele) => (
                  <>
                    <option>----select----</option>
                    <option>{ele.category}</option>
                  </>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label> Subcategory</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                size="sm"
                onChange={(e) => setsubcategory(e.target.value)}
              >
                {SubcategoryData?.map((ele) => (
                  <>
                    <option>----select----</option>
                    <option>{ele.Subcat}</option>
                  </>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Product Name</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Product Name"
                onChange={(e) => setproductname(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>HSN Code</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="HSN Code"
                onChange={(e) => sethsncode(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Price</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Original Price"
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Offer Price </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Offer Price"
                onChange={(e) => setofferprice(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Offer </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Offer"
                onChange={(e) => setoffer(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Select App</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select onChange={(e) => setselectapp(e.target.value)}>
                <option>Choose...</option>
                <option>USER APP</option>
                <option>VENDOR APP</option>
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Description </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Description"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Product Image</Form.Label>
            </div>
            <div className="col-md-8 cateimg p-5">
              {/* add multiple images */}
              {productimage && (
                <img
                  src={URL.createObjectURL(productimage)}
                  alt="Product Preview"
                  width={120}
                  height={120}
                />
              )}
              <Form.Label>
                <i className="pi pi-cloud-upload m-auto"></i>
                <Form.Control
                  className="inpfile"
                  type="file"
                  onChange={(e) => setproductimage(e.target.files[0])}
                />
                <p className="m-auto">Drag your image here</p>
              </Form.Label>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="col-md-12  ofheader p-3">
          <div className="row">
            <button
              className="col-md-4 btn_bg p-2 m-auto"
              onClick={() => setshowProduct(false)}
            >
              Cancel
            </button>
            <button
              className="col-md-4 btn_bg save p-2 m-auto btncwhite"
              onClick={Addproduct}
            >
              Save
            </button>
          </div>
        </div>
      </Offcanvas>

      {/*  Edit Product Modal */}

      <Offcanvas
        show={editProduct}
        onHide={() => seteditProduct(false)}
        placement="end"
        className="offcan"
      >
        <Offcanvas.Header className="col-md-12 ofheader">
          <div className="title ">
            <div>
              <Offcanvas.Title className="">Edit Product</Offcanvas.Title>
              <p>Embed Your Product Product and Crucial Details Instantly</p>
            </div>
            <button onClick={() => seteditProduct(false)} className="closebtn ">
              x
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mb-3">
            <div className="col-md-4 ">
              <Form.Label> Category</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                size="sm"
                onChange={(e) => setcategory(e.target.value)}
                defaultValue={productobject.category}
              >
                {CategoryData?.map((ele) => (
                  <>
                    <option>----select----</option>
                    <option>{ele.category}</option>
                  </>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label> Subcategory</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                size="sm"
                onChange={(e) => setsubcategory(e.target.value)}
                defaultValue={productobject.subcategory}
              >
                {SubcategoryData?.map((ele) => (
                  <>
                    <option>----select----</option>
                    <option>{ele.Subcat}</option>
                  </>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Product Name</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Product Name"
                onChange={(e) => setproductname(e.target.value)}
                defaultValue={productobject.productname}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>HSN Code</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="HSN Code"
                onChange={(e) => sethsncode(e.target.value)}
                defaultValue={productobject.hsncode}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Price</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Original Price"
                onChange={(e) => setprice(e.target.value)}
                defaultValue={productobject.price}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Offer Price </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Offer Price"
                onChange={(e) => setofferprice(e.target.value)}
                defaultValue={productobject.offerprice}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Offer </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Offer"
                onChange={(e) => setoffer(e.target.value)}
                defaultValue={productobject.offer}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Select App</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                onChange={(e) => setselectapp(e.target.value)}
                defaultValue={productobject.selectapp}
              >
                <option>Choose...</option>
                <option>USER APP</option>
                <option>VENDOR APP</option>
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Description </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                placeholder="Description"
                onChange={(e) => setdescription(e.target.value)}
                defaultValue={productobject.description}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Product Image</Form.Label>
            </div>
            <div className="col-md-8 cateimg p-5">
              {/* add multiple images */}
              {/* {productimage && (
                <img
                  src={URL.createObjectURL(productimage)}
                  alt="Product Preview"
                  width={120}
                  height={120}
                />
              )} */}
              {productimage ? (
                <img
                  src={URL.createObjectURL(productimage)}
                  alt="Product Preview"
                  width={120}
                  height={120}
                />
              ) : (
                <img
                  src={`http://localhost:8002/Product/${productobject.productimage}`}
                  alt="Product Preview"
                  width={120}
                  height={120}
                />
              )}
              <Form.Label>
                <i className="pi pi-cloud-upload m-auto"></i>
                <Form.Control
                  className="inpfile"
                  type="file"
                  onChange={(e) => setproductimage(e.target.files[0])}
                  // defaultValue={productobject.productimage}
                />
                <p className="m-auto">Drag your image here</p>
              </Form.Label>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="col-md-12  ofheader p-3">
          <div className="row">
            <button
              className="col-md-4 btn_bg p-2 m-auto"
              onClick={() => seteditProduct(false)}
            >
              Cancel
            </button>
            <button
              className="col-md-4 btn_bg save p-2 m-auto btncwhite"
              onClick={Editproduct}
            >
              Save
            </button>
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
