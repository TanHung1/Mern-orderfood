import React from "react";

import HomeComponent from "../view/HomeComponent";
import MenuComponent from "../view/MenuComponent";
import AboutComponent from "./../view/AboutComponent";
import LoginComponent from "../view/LoginComponent";
import CartComponent from "../view/CartComponent";
import RegisterComponent from "../view/RegisterComponent";
import MyAccountEdit from "./MyAccountEdit";
import PreviousOders from "../view/PreviousOrders";
import CheckOut from "../view/CheckOut";
import ManageAccount from "../components/ManageAccount";
import ManageFood from "../components/ManageFood";
import EditFood from "../components/EditFood";
import EditAccount from "../components/EditAccount";
import TrashFood from "../components/TrashFood";
import StaffBill from "../components/StaffBill";
import ManageBill from "../components/ManageBill";
import EditBill from "../components/EditBill";
import StaffEditBill from "../components/StaffEditBill";
import Footer from "../view/Footer";

import Nav from "../view/Nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailProduct } from "./DetailProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" exact element={<HomeComponent />}></Route>
            <Route path="/menu" element={<MenuComponent />}></Route>
            <Route path="/detail-product/:_id" element={<DetailProduct/>}></Route>
            <Route path="/about" element={<AboutComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}>
              {" "}
            </Route>
            <Route path="/cart" element={<CartComponent />}>
              {" "}
            </Route>
            <Route path="/register" element={<RegisterComponent />}>
              {" "}
            </Route>
            <Route path="/my-account/edit" element={<MyAccountEdit />}></Route>
            <Route
              path="/my-account/previous-orders"
              element={<PreviousOders />}
            ></Route>
            <Route path="/checkout" element={<CheckOut />}>
              {" "}
            </Route>

            <Route
              path="/admin/manage-account"
              element={<ManageAccount />}
            ></Route>
            <Route path="/admin/manage-food" element={<ManageFood />}></Route>
            <Route path="/admin/trash-food" element={<TrashFood />}></Route>
            <Route path="/admin/edit-food/:_id" element={<EditFood />}>
              {" "}
            </Route>
            <Route path="/admin/Edit-account/:_id" element={<EditAccount />}>
              {" "}
            </Route>
            <Route path="/Staff/manage-bill" element={<StaffBill />}>
              {" "}
            </Route>
            <Route path="/Staff/manage-bill/edit/:_id" element={<StaffEditBill />}>
              {" "}
            </Route>
            <Route path="/Admin/manage-bill" element={<ManageBill />}>
              {" "}
            </Route>
            <Route path="/Admin/manage-bill/edit/:_id" element={<EditBill />}>
              {" "}
            </Route>
          </Routes>
        </header>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
