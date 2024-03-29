import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Nav.scss";
import pizza from "../assets/logoPizza.png";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Nav() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const user = JSON.parse(localStorage.getItem("token")) || [];
  useEffect(() => {});

  // useEffect(() => {
  //   if (location.pathname === "/my-account/edit") {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/login");
  //     }
  //   }
  // }, [location, navigate]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#ffd700" }}
    >
      <NavLink className="navbar-brand" to="/">
        <img src={pizza} style={{ width: "40px" }} />
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
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/menu">
              Thực đơn
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/about">
              Về N o No
            </NavLink>
          </li>
          {user?.user?.role !== "staff" ? null : (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/Staff/manage-bill"
              >
                Nhân viên
              </NavLink>
            </li>
          )}
          {user?.user?.role !== "admin" ? null : (
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
                Quản trị viên
              </a>

              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/admin/manage-food">
                    Quản lý thức ăn
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/Admin/manage-bill">
                    Quản lý hóa đơn
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/admin/manage-account">
                    Quản lý tài khoản
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/admin/Thongke">
                    Thống kê doanh thu
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>

        <form className="form-inline my-2 my-lg-0">
          <NavLink to="/cart" activeClassName="active">
            <i className="fa-solid fa-cart-shopping">
              {cartItemCount > 0 && (
                <span className="cart-count">({cartItemCount})</span>
              )}
            </i>
          </NavLink>

          {!user?.user ? (
            <NavLink to="/login" activeClassName="active">
              <i className="fa-solid fa-user"></i>
            </NavLink>
          ) : (
            <NavLink to="/my-account/edit" activeClassName="active">
              {user.user.avatar ? (
                <Avatar src={user.user.avatar}></Avatar>
              ) : (
                <Avatar                  
                  style={{
                    border: "1px solid black",
                  }}
                ><UserOutlined />
                </Avatar>
              )}
            </NavLink>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Nav;
