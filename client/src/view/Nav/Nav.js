import React from "react";
import "./Nav.scss";
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.pathname = "/login"; // Chuyển hướng đến trang đăng nhập khi đăng xuất
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCartItemCount(itemCount);
  }, []);
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
        {/* <i class="fa-solid fa-cart-shopping"></i>  */}
        <div className="nav-right">
          <NavLink to="/cart" activeClassName="active">
            <i class="fa-solid fa-cart-shopping"></i>
          </NavLink>
          <NavLink to="/my-account/edit" activeClassName="active">
            <i class="fa-solid fa-user"></i>
          </NavLink>
          <NavLink onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
