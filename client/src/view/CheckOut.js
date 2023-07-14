import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CheckOut.scss";
import { Modal, message, Button, Result, notification } from "antd";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

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
  .required()

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const accessToken = localStorage.getItem("token");
  const dataUser = JSON.parse(accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCustomerName(dataUser.user.username);
    setCustomerAddress(dataUser.user.address);
    setCustomerPhone(dataUser.user.phonenumber);
    setCustomerEmail(dataUser.user.email);
    setCart(cartItems);

    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      setCustomerName(dataUser.user.username);
      setCustomerAddress(dataUser.user.address);
      setCustomerPhone(dataUser.user.phonenumber);
      setCustomerEmail(dataUser.user.email);
    }
  }, []);

  const handleCashOnDelivery = () => {
    setPayment("Thanh toán khi giao hàng");
    setPaymentError(false);
  };

  const handleMomoPayment = () => {
    setPayment("Thanh toán qua momo");
    setPaymentError(false);
  };

  const handlePayment = async () => {
    try {
      if (!accessToken) {
        Modal.warning({
          title: "Thông báo",
          content: "Bạn cần đăng nhập để tiếp tục đặt hàng.",
          onOk: () => navigate("/login"),
        });
        return;
      }

      if (!payment) {
        setPaymentError(true);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/order/neworder",
        {
          cart,
          customerName,
          customerAddress,
          customerPhone,
          customerEmail,
          payment,
          customerID: dataUser.user._id,
        },
        token
      );
      message.success("Đặt hàng thành công")
      
      setTimeout(message.destroy, 2500);
      setTimeout(() => {
        localStorage.removeItem("cart");
        setCart([]);
        setCustomerName("");
        setCustomerAddress("");
        setCustomerPhone("");
        setCustomerEmail("");
      }, 500)
    } catch (error) {
      console.error(error);
      notification.error({message: error.response?.data?.error})
    }
  };

  const renders = () => {
    return cart.map((item, index) => {
      return (
        <div key={index}>
          <h5>{item.nameprod}</h5>
          <h5>
            <img src={item.image} style={{ width: "10%" }} />
          </h5>
          <p style={{ color: "black" }}>
            Giá: {item.price.toLocaleString()}&#8363;
          </p>
          <div className="detail">
            <h5>Số lượng: {item.quantity}</h5>
          </div>
          <hr />
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Thông tin đơn hàng</h2>
      {cart.length === 0 ? (
        <Result
        status="success"
        title="Đơn hàng của bạn đã thanh toán thành công"
        subTitle="Sẽ có nhân viên gọi để để xác nhận lại đơn hàng"       
        extra={[
          <Link to={"/menu"}>
            <Button key="buy">Tiếp tục mua</Button>,
          </Link>
        ]}
      />
      ) : (
        <div className="checkout">
          <div className="checkout-info">
            <h3>Thông tin khách hàng</h3>
            <div className="form-group">
              <label>Họ tên:</label>
              <input
                type="text"
                value={customerName}
                {...register("username")}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <label style={{ color: 'red' }}>{errors.username?.message}</label>
            </div>
            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                value={customerAddress}
                {...register("address")}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
              <label style={{ color: 'red' }}>{errors.address?.message}</label>
            </div>
            <div className="form-group">
              <label>Điện thoại:</label>
              <input
                type="text"
                value={customerPhone}
                {...register("phonenumber")}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <label style={{ color: 'red' }}>{errors.phonenumber?.message}</label>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={customerEmail}
                {...register("email")}

                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <label style={{ color: 'red' }}>{errors.email?.message}</label>

            </div>
            <div className="form-group">
              <label>Hình thức thanh toán:</label>
              <div>
                <button onClick={handleCashOnDelivery}>
                  Thanh toán khi giao hàng
                </button>
                <button onClick={handleMomoPayment}>Thanh toán qua Momo</button>
              </div>
              {paymentError && (
                <p style={{ color: "red" }}>
                  Vui lòng chọn hình thức thanh toán
                </p>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Tiến hành đặt hàng</label>
              <button onClick={handleSubmit(handlePayment)}>Đặt hàng</button>
            </div>
          </div>
          <div className="checkout-items">
            {renders()}
            <p>
              Tổng tiền:{" "}
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}
              &#8363;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
