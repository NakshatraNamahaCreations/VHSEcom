import React, { useRef, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Card } from "react-bootstrap";
import { customStyles } from "./data";
import Offcanvas from "react-bootstrap/Offcanvas";
import http from "../http.common.function";
import { ImageApiURL } from "../../src/path";

export default function Subcategory() {
  const [showSubcategory, setshowSubcategory] = useState(false);
  const [EditData, setEditData] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [Subcategory, setSubCategory] = useState("");
  const [SelectCategory, setSelectCategory] = useState("");
  const [SubcategoryImage, setSubCategoryImage] = useState("");
  const [CategoryData, setCategoryData] = useState();
  const [SubcategoryData, setSubcategoryData] = useState();
  const [editSubcategory, seteditSubcategory] = useState(false);
  const [SubcategoryID, setSubcategoryID] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubCategoryImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    getcategory();
    getSubcategory();
  }, [SearchValue]);
  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.category,
    },

    {
      name: "Subcategory Name",
      selector: (row) => row.Subcat,
    },
    {
      name: "Subcategory Image",
      selector: (row) => (
        <>
          <img
            width={80}
            height={80}
            src={`${row?.SubcatImage}`}
            style={{ padding: "10px" }}
          />
        </>
      ),
    },
    {
      name: "ACTION",
      selector: (row) => (
        <div className="row">
          <span className="hyperlink col-md-3" style={{ cursor: "pointer" }}>
            <i
              onClick={() => handleUpdateSubcategory(row._id)}
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
            |{" "}
          </span>

          <a
            onClick={() => deleteSubCategory(row._id)}
            className="hyperlink mx-1 col-md-3"
          >
            <i
              class="fa fa-trash"
              title="Delete"
              style={{ color: "#dc3545" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];

  const AddSubcategory = async () => {
    if (!SubcategoryImage || !Subcategory) {
      return alert("Please select Image");
    }
    try {
      const formdata = new FormData();
      formdata.append("SubcatImage", SubcategoryImage);
      formdata.append("Subcat", Subcategory);
      formdata.append("category", SelectCategory);

      let response = await http.post(`subcat/addSubcategory`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Subcategory Added Succesfully");
        window.location.reload("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSubCategory = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Subcategory?`
    );

    if (confirmed) {
      let data = await http.post(`/subcat/trash/${idd}`);
      if (data.status === 200) {
        alert("Subcategory deleted succesfully ");
        window.location.reload();
      }
    } else {
      console.log("Subcategory canceled the deletion.");
    }
  };
  const getcategory = async () => {
    try {
      let category = await http.get(`/category/getallcategory`);

      setCategoryData(category.data.data);
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  const getSubcategory = async () => {
    try {
      let Subcategory = await http.get(`/subcat/getsubcategory`, {
        params: { searchValue: SearchValue },
      });
      setSubcategoryData(Subcategory.data.data);
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  console.log("subcategoryData===", SubcategoryData);

  const handleUpdateSubcategory = async (id) => {
    try {
      let category = await http.get(`/subcat/getbySubcategoryid/${id}`);
      setSubcategoryID(id);
      setEditData(category.data.data);
      setshowSubcategory(true);
      seteditSubcategory(true);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("SubcatImage", SubcategoryImage);
      formdata.append("Subcat", Subcategory);
      formdata.append("category", SelectCategory);

      let response = await http.put(
        `subcat/editSubcategory/${SubcategoryID}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Category updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleAddNewCategory = () => {
    setSubCategory("");
    setSubCategoryImage(null);
    seteditSubcategory(false);
    setSubcategoryID(null);
    setEditData({});
    setshowSubcategory(true);
  };

  return (
    <>
      <Card className=" mt-4 p-3">
        <div className="row">
          <div className="col-md-10 m-auto"></div>

          <button
            onClick={handleAddNewCategory}
            className="col-md-2 btn_bg p-2 m-auto float-end"
          >
            <i className="pi pi-plus"></i> Add Subcategory
          </button>
        </div>
      </Card>

      <div className="row mt-4">
        <div className="col-md-9"></div>
        <div className="col-md-3 m-auto float-end">
          <Form.Control
            className=""
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Subcategory..."
          />
        </div>
      </div>
      <DataTable
        className="mt-3"
        columns={columns}
        data={SubcategoryData}
        highlightOnHover
        pointerOnHover
        pagination
        selectableRows
        bordered
        customStyles={customStyles}
      />
      <Offcanvas
        show={showSubcategory}
        onHide={() => setshowSubcategory(false)}
        placement="end"
        className="offcan"
      >
        <Offcanvas.Header className="col-md-12 ofheader">
          <div className="title ">
            <div>
              <Offcanvas.Title className="">
                {editSubcategory && SubcategoryID !== null
                  ? "Modify Subcategory"
                  : "Add Subcategory"}
              </Offcanvas.Title>
              <p>
                Embed Your Product Subcategory and Crucial Details Instantly
              </p>
            </div>
            <button
              onClick={() => setshowSubcategory(false)}
              className="closebtn "
            >
              x
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row ">
            <div className="col-md-4">
              <Form.Label>Select Category</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                size="sm"
                defaultValue={
                  editSubcategory && SubcategoryID !== null
                    ? EditData.category
                    : ""
                }
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                {CategoryData?.map((ele) => (
                  <>
                    <option>---select Category---</option>
                    <option>{ele.category}</option>
                  </>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Label>Subcategory</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                defaultValue={
                  editSubcategory && SubcategoryID !== null
                    ? EditData.Subcat
                    : ""
                }
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="Subcategory"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Label>Subcategory Image</Form.Label>
            </div>
            <div className="col-md-8 ">
              {/* {imagePreview ? (
                  <img
                    width={40}
                    height={40}
                    src={imagePreview}
                    alt="Subcategory Preview"
                  />
                ) : editSubcategory && SubcategoryID !== null ? (
                  <img
                    width={120}
                    height={120}
                    src={`${ImageApiURL}/Subcategory/${EditData.SubcatImage}`}
                    alt="Subcategory Image"
                  />
                ) : (
                  <i className="pi pi-cloud-upload m-auto"></i>
                )} */}
              <Form.Control
                type="text"
                onChange={(e) => setSubCategoryImage(e.target.value)}
                value={
                  SubcategoryImage ||
                  (editSubcategory &&
                    SubcategoryID !== null &&
                    EditData.SubcatImage)
                }
                style={{ width: "100%" }}
              />
              {/* <p className="m-auto">Drag your image here</p> */}
            </div>
          </div>
        </Offcanvas.Body>
        <div className="col-md-12  ofheader p-3">
          <div className="row">
            <button
              className="col-md-4 btn_bg p-2 m-auto"
              onClick={() => setshowSubcategory(false)}
            >
              Cancel
            </button>
            {editSubcategory ? (
              <button
                className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                onClick={AddSubcategory}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
