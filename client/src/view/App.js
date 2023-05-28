import React from "react";

import "./App.scss";
import HomeComponent from "./Home/HomeComponent";
import MenuComponent from "./Menu/MenuComponent";
import AboutComponent from "./About/AboutComponent";
import LoginComponent from "./Login/LoginComponent";
import CartComponent from "./Cart/CartComponent";
import RegisterComponent from "./Register/RegisterComponent";
import MyAccountEdit from "./My-Account/My-Account-Edit/MyAccountEdit";
import PreviousOders from "./My-Account/My-Account-Edit/PreviousOrders";
import CheckOut from "./checkout/CheckOut";
import DishComponent from "./dish/DishComponent";
import AdminHome from "./Admin/AdminHome";
import AdminCustumer from "./Admin/ManageCustumer/AdminCustumer";
import ManageStaff from "./Admin/ManageStaff/ManageStaff";
import ManageFood from "./Admin/ManageFood/ManageFood";
import EditFood from "./Admin/ManageFood/EditFood";
import EditStaff from "./Admin/ManageStaff/EditStaff";
import EditCustumer from "./Admin/ManageCustumer/EditCustumer";
import ManageBill from "./Admin/ManageBill/ManageBill";
import EditBill from "./Admin/ManageBill/EditBill";

import Nav from "./Nav/Nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" exact element={<HomeComponent />}></Route>
            <Route path="/menu" element={<MenuComponent />}></Route>
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
            <Route path="/dish/:id" element={<DishComponent />}></Route>
            <Route path="/admin" element={<AdminHome />}></Route>
            <Route path="/manage-custumer" element={<AdminCustumer />}></Route>
            <Route path="/manage-staff" element={<ManageStaff />}></Route>
            <Route path="/manage-food" element={<ManageFood />}></Route>
            <Route path="/edit-food/:_id" element={<EditFood />}>
              {" "}
            </Route>
            <Route path="/Edit-staff/:id" element={<EditStaff />}>
              {" "}
            </Route>
            <Route path="/Edit-custumer/:id" element={<EditCustumer />}></Route>
            <Route path="/Staff/manage-bill" element={<ManageBill />}>
              {" "}
            </Route>
            <Route path="/manage-bill/edit/:id" element={<EditBill />}>
              {" "}
            </Route>
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
