import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout";
import Dashboard from "./Component/Dashboard";
import Header from "./Component/Header";
import Category from "./Component/category";
import Subcategory from "./Component/subcategory";
import Invoice from "./Component/Invoice";
import Product from "./Component/Product";
import OrderList from "./Component/OrderList";
import PrductView from "./Component/PrductView";
import Reports from "./Component/Reports";
import Customers from "./Component/Customers";
import CustomerView from "./Component/CustomerView";
import Login from "./Component/Login";
import Offers from "./Component/Offers";
import Banners from "./Component/Banner";
import Signup from "./Component/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <Layout>
              <Header />
              <Dashboard />
            </Layout>
          }
        />
        <Route
          exact
          path="/category"
          element={
            <Layout>
              <Header />
              <Category />
            </Layout>
          }
        />
        <Route
          exact
          path="/subcategory"
          element={
            <Layout>
              <Header />
              <Subcategory />
            </Layout>
          }
        />
        <Route
          exact
          path="/Invoice"
          element={
            <Layout>
              <Header />
              <Invoice />
            </Layout>
          }
        />
        <Route
          exact
          path="/Product"
          element={
            <Layout>
              <Header />
              <Product />
            </Layout>
          }
        />
        <Route
          exact
          path="/OrderList"
          element={
            <Layout>
              <Header />
              <OrderList />
            </Layout>
          }
        />
        <Route
          exact
          path="/PrductView/:id"
          element={
            <Layout>
              <Header />
              <PrductView />
            </Layout>
          }
        />
        <Route
          exact
          path="/Reports"
          element={
            <Layout>
              <Header />
              <Reports />
            </Layout>
          }
        />
        <Route
          exact
          path="/Customers"
          element={
            <Layout>
              <Header />
              <Customers />
            </Layout>
          }
        />
        <Route
          exact
          path="/CustomerView"
          element={
            <Layout>
              <Header />
              <CustomerView />
            </Layout>
          }
        />
        <Route
          exact
          path="/Offers"
          element={
            <Layout>
              <Header />
              <Offers />
            </Layout>
          }
        />
        <Route
          exact
          path="/banners"
          element={
            <Layout>
              <Header />
              <Banners />
            </Layout>
          }
        />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
