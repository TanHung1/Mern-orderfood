import React from "react";
import "./Nav.scss";
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCartItemCount(itemCount);
  }, [cartItemCount]);

  useEffect(() => {
    if (location.pathname === "/my-account/edit") {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [location, navigate]);

  return (
    <div>
      <div className="topnav">
        <div className="nav-left">
          <NavLink to="/" activeClassName="active" exact={true}>
            Home
          </NavLink>
          <NavLink to="/menu" activeClassName="active">
            Menu
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/admin" activeClassName="active">
            Admin
          </NavLink>
          <NavLink to="/Staff/manage-bill" activeClassName="active">
            Staff
          </NavLink>
        </div>
        <div className="nav-right">
          <NavLink to="/cart" activeClassName="active">
            <i className="fa-solid fa-cart-shopping">
              {cartItemCount > 0 && (
                <span className="cart-count">({cartItemCount})</span>
              )}
            </i>
          </NavLink>
          <NavLink to="/my-account/edit" activeClassName="active">
            <i className="fa-solid fa-user"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
