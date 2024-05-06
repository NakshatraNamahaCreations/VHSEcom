import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Link, useNavigation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ServicePage } from "../Api";

function Sidenav() {
  

  const Logout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userdata")).token;
  
      if (!token) {
        console.error("Token not found");
        return;
      }
  
      const response = await ServicePage.logout({ token });
  
      console.log("Server Response:", response.data.message);
  
      if (response.status === 200) {
        // Perform the desired action after successful logout
        // navigate("/");
      } else {
        console.error("Logout unsuccessful");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  
  return (
    <div className="row">
      <h5 className="mt-2 f-bold text-center"> Vijay Home Services </h5>
      <Sidebar className="sidenav">
        <Menu>
          <MenuItem
            component={<Link className="M-link" to="/home" />}
            icon={<i className="pi pi-th-large"></i>}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={<Link className="M-link" to="/banners" />}
            icon={<i className="pi pi-image"></i>}
          >
            Banners
          </MenuItem>
          <SubMenu icon={<i className="pi pi-slack"></i>} label="Catalog">
            <MenuItem component={<Link className="M-link" to="/category" />}>
              Category
            </MenuItem>
            <MenuItem component={<Link className="M-link" to="/subcategory" />}>
              SubCategory
            </MenuItem>
            <MenuItem component={<Link className="M-link" to="/Offers" />}>
              Offers
            </MenuItem>
          </SubMenu>

          <MenuItem
            component={<Link className="M-link" to="/Product" />}
            icon={<i className="pi pi-cart-plus"></i>}
          >
            Product
          </MenuItem>
          <MenuItem
            component={<Link className="M-link" to="/OrderList" />}
            icon={<i className="pi pi-list"></i>}
          >
            Order list
          </MenuItem>
          <MenuItem
            component={<Link className="M-link" to="/Reports" />}
            icon={<i className="pi pi-folder-open"></i>}
          >
            Reports
          </MenuItem>
          <MenuItem
            icon={<GroupsOutlinedIcon />}
            component={<Link className="M-link" to="/Customers" />}
          >
            {" "}
            Customers{" "}
          </MenuItem>
          <MenuItem>
            <Button onClick={Logout}>Logout</Button>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Sidenav;
