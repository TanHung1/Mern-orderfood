import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCartItemCount(itemCount);
  }, []);

  useEffect(() => {
    if (location.pathname === "/my-account/edit") {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [location, navigate]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#ffd700" }}
    >
      <NavLink className="navbar-brand" to="/">
        Navbar
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" exact to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/menu">
              Menu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <NavLink className="dropdown-item" to="/manage-food">
                  Quản lý thức ăn
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/Staff/manage-bill">
                  Quản lý hóa đơn
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
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
        </form>
      </div>
    </nav>
  );
}

export default Nav;
