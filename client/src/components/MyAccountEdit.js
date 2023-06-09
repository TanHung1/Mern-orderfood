import React from "react";
import "../styles/MyAccountEdit.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
function MyAccountEdit() {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [message, setMessage] = useState("");
  const accessToken = localStorage.getItem("token");
  const dataUser = JSON.parse(accessToken);

  useEffect(() => {
    if (accessToken) {
      setCustomerName(dataUser.user.username);
      setCustomerAddress(dataUser.user.address);
      setCustomerPhone(dataUser.user.phonenumber);
      setCustomerEmail(dataUser.user.email);
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("token");

    // Xóa giỏ hàng khỏi localStorage
    localStorage.removeItem("cart");

    // Chuyển hướng đến trang đăng nhập
    window.location.pathname = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/account/${dataUser.user._id}/update-account`,
        {
          username: customerName,
          phonenumber: customerPhone,
          address: customerAddress,
          email: customerEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
      alert("Cap nhat thanh cong");

      // Cập nhật thông tin khách hàng trong localStorage
      const updatedUser = {
        ...dataUser.user,
        username: customerName,
        phonenumber: customerPhone,
        address: customerAddress,
        email: customerEmail,
      };
      localStorage.setItem("token", JSON.stringify({ user: updatedUser }));
    } catch (error) {
      console.error(error);
      setMessage("Cập nhật thông tin thất bại. Vui lòng thử lại.");
      alert("Cap nhat that bai");
    }
  };
  return (
    <section className="my-account-wrapper">
      <div className="my-account-content">
        <div className="nav-info-menu">
          <div>
            <div className="left-previousOders-content">
              <div className="header-info">
                <h2>
                  XIN CHÀO,
                  <br /> {customerName}
                </h2>
                <p>
                  <NavLink onClick={handleLogout}>Đăng xuất</NavLink>
                </p>
              </div>
              <ul>
                <li>
                  {" "}
                  <Link to={"/my-account/previous-orders"} className="link">
                    Lịch sử đặt hàng
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/my-account/edit"} className="link">
                    Chi tiết tài khoản
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right-history">
          <div className="previous-oders-right">
            <h3>THÔNG TIN CÁ NHÂN</h3>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ giao hàng</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Số điện thoại</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ email</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccountEdit;