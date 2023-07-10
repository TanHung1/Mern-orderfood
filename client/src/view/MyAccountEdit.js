import React from "react";
import "../styles/MyAccountEdit.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Modal, Button, message } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Họ và tên chỉ cho phép các ký tự chữ")
      .required("Không được để trống họ và tên"),

    address: yup.string().required("Không được để trống địa chỉ giao hàng"),

    phonenumber: yup
      .number()
      .required("Không được để trống số điện thoại")
      .typeError("Số điện thoại không hợp lệ")
      .min(1000000000, "Số điện thoại phải đủ 10 chữ số")
      .max(9999999999, "Số điện thoại phải đủ 10 chữ số"),

    email: yup
      .string()
      .email("Định dạng email không hợp lệ")
      .required("Không được để trống email"),
  })
  .required();

function MyAccountEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [customerName, setCustomerName] = useState("");
  const [FullName, setFullName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const accessToken = localStorage.getItem("token");

  const dataUser = JSON.parse(accessToken);

  useEffect(() => {
    if (accessToken) {
      setCustomerName(dataUser.user?.username);
      setCustomerAddress(dataUser.user?.address);
      setCustomerPhone(dataUser.user?.phonenumber);
      setCustomerEmail(dataUser.user?.email);
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

  const handleUpdate = async () => {
    // e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/account/${dataUser?.user?._id}/update-account`,
        {
          username: customerName,
          phonenumber: customerPhone,
          address: customerAddress,
          email: customerEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${dataUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedUser = {
        ...dataUser?.user,
        username: customerName,
        phonenumber: customerPhone,
        address: customerAddress,
        email: customerEmail,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({ user: updatedUser, token: dataUser?.token })
      );
      setFullName(customerName);

      message.success("Cập nhật thành công");
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thông tin thất bại. Vui lòng thử lại.");
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
                  <br /> {FullName}
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
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerName}
                  {...register("username")}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <label style={{ color: "red" }}>
                  {errors.username?.message}
                </label>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ giao hàng</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerAddress}
                  {...register("address")}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
              <label style={{ color: "red" }}>{errors.address?.message}</label>
              <div class="form-group">
                <label for="exampleInputEmail1">Số điện thoại</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerPhone}
                  {...register("phonenumber")}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <label style={{ color: "red" }}>
                  {errors.phonenumber?.message}
                </label>
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ email</label>
                <input
                  // type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerEmail}
                  {...register("email")}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <label style={{ color: "red" }}>{errors.email?.message}</label>
              </div>
              <button
                onClick={handleSubmit(handleUpdate)}
                type="submit"
                class="btn btn-primary"
              >
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
