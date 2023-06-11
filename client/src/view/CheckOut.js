import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CheckOut.scss";
import { Modal } from "antd";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
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
      setCustomerName("");
      setCustomerAddress(dataUser.user.address);
      setCustomerPhone(dataUser.user.phonenumber);
      setCustomerEmail(dataUser.user.email);
    }
  }, []);

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

      const response = await axios.post(
        "http://localhost:5000/api/order/neworder",
        {
          cart,
          customerName: dataUser.user.username,
          customerAddress,
          customerPhone: dataUser.user.phonenumber,
          customerEmail: dataUser.user.email,
          customerID: dataUser.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      Modal.success({
        title: "Thông báo",
        content: "Thanh toán thành công!",
        onOk: () => {
          console.log(cart);
          localStorage.removeItem("cart");
          setCart([]);
          setCustomerName("");
          setCustomerAddress("");
          setCustomerPhone("");
          setCustomerEmail("");
        },
      });
    } catch (error) {
      console.error(error);
      Modal.error({
        title: "Thông báo",
        content: "Thanh toán thất bại. Vui lòng thử lại sau.",
      });
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
        <p>Đơn hàng của bạn đang trống</p>
      ) : (
        <div className="checkout">
          <div className="checkout-info">
            <h3>Thông tin khách hàng</h3>
            <div className="form-group">
              <label>Họ tên:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Điện thoại:</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tiến hành đặt hàng</label>
              <button onClick={handlePayment}>Đặt hàng</button>
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
