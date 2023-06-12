import React from "react";

import HomeComponent from "../view/HomeComponent";
import MenuComponent from "../view/MenuComponent";
import AboutComponent from "./../view/AboutComponent";
import LoginComponent from "../view/LoginComponent";
import CartComponent from "../components/CartComponent";
import RegisterComponent from "../view/RegisterComponent";
import MyAccountEdit from "../components/MyAccountEdit";
import PreviousOders from "../components/PreviousOrders";
import CheckOut from "../view/CheckOut";
import DishComponent from "../components/DishComponent";
import AdminHome from "../components/AdminHome";
import AdminCustumer from "../components/AdminCustumer";
import ManageStaff from "../components/ManageStaff";
import ManageFood from "../components/ManageFood";
import EditFood from "../components/EditFood";
import EditStaff from "../components/EditStaff";
import EditCustumer from "../components/EditCustumer";
import ManageBill from "../components/ManageBill";
import EditBill from "../components/EditBill";
import Footer from "../view/Footer";

import Nav from "../view/Nav";

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
