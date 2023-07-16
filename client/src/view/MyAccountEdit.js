import React from "react";
import "../styles/MyAccountEdit.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Modal, Button, message, notification } from "antd";
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
      .string()
      .required("Không được để trống số điện thoại")
      .typeError("Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại phải đủ 10 chữ số")
      .max(10, "Số điện thoại phải đủ 10 chữ số"),

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
  const [customerAvatar, setCustomerAvatar] = useState("");
  // const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const accessToken = localStorage.getItem("token");

  const dataUser = JSON.parse(accessToken);

  useEffect(() => {
    setCustomerName(dataUser.user.username);
    setCustomerAddress(dataUser.user.address);
    setCustomerPhone(dataUser.user.phonenumber);
    setCustomerEmail(dataUser.user.email);

    if (accessToken) {
      setCustomerName(dataUser.user?.username);
      setCustomerAddress(dataUser.user?.address);
      setCustomerPhone(dataUser.user?.phonenumber);
      setCustomerEmail(dataUser.user?.email);
      setCustomerAvatar(dataUser.user?.avatar);
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("token");

    // Xóa giỏ hàng khỏi localStorage
    localStorage.removeItem("cart");

    // Chuyển hướng đến trang đăng nhập
    //window.location.pathname = "/login";
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const validatedData = await schema.validate(
        {
          username: customerName,
          address: customerAddress,
          phonenumber: customerPhone,
          email: customerEmail,
        },
        { abortEarly: false }
      );

      // Gửi dữ liệu lên server nếu dữ liệu hợp lệ
      const response = await axios.put(
        `http://localhost:5000/api/account/${dataUser?.user?._id}/update-account`,
        validatedData,
        {
          headers: {
            Authorization: `Bearer ${dataUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      // Lưu thông tin người dùng mới vào local storage và cập nhật state
      const updatedUser = {
        ...dataUser?.user,
        username: validatedData.username,
        phonenumber: validatedData.phonenumber,
        address: validatedData.address,
        email: validatedData.email,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({ user: updatedUser, token: dataUser?.token })
      );
      setFullName(validatedData.username);

      // Hiển thị thông báo thành công
      message.success("Cập nhật thành công");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Nếu có lỗi xảy ra, hiển thị các thông báo lỗi
        const errorMessages = error.errors;

        const errorMessageList = errorMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ));

        notification.error({
          message: <ul>{errorMessageList}</ul>,
        });
      } else {
        console.error(error.response?.data?.error);
        notification.error({ message: error.response?.data?.error });
      }
    }
  };

  return (
    <section className="my-account-wrapper">
      <div className="my-account-content">
        <div className="nav-info-menu">
          <div>
            <div className="left-previousOders-content">
              <div className="header-info">
                <div>
                  <img src={customerAvatar}></img>
                </div>
                <h2>
                  XIN CHÀO,
                  <br /> {FullName}
                </h2>
                <p>
                  <NavLink onClick={handleLogout} to={"/login"}>
                    Đăng xuất
                  </NavLink>
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
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label for="exampleInputEmail1">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerName}
                  {...register("username")}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Địa chỉ giao hàng</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerAddress}
                  {...register("address")}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
                <label style={{ color: "red" }}>
                  {errors.address?.message}
                </label>
              </div>
              <label style={{ color: "red" }}>{errors.address?.message}</label>
              <div className="form-group">
                <label for="exampleInputEmail1">Số điện thoại</label>
                <input
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerPhone}
                  {...register("phonenumber")}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputEmail1">Địa chỉ email</label>
                <input
                  // type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={customerEmail}
                  {...register("email")}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
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
