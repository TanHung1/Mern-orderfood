import React, { useState, useEffect } from "react";
import axios from "axios";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const handlePayment = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        alert("Bạn cần đăng nhập để tiếp tục đặt hàng.");
        return;
      }
      console.log(accessToken);
      const response = await axios.post(
        "http://localhost:5000/api/checkout",
        {
          cart,
          customerName,
          customerAddress,
          customerPhone,
          customerEmail,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("Thanh toán thành công!", response);
      console.log(cart);
      localStorage.removeItem("cart");
      setCart([]);
      setCustomerName("");
      setCustomerAddress("");
      setCustomerPhone("");
      setCustomerEmail("");
    } catch (error) {
      console.error(error);
      alert("Thanh toán thất bại. Vui lòng thử lại sau.");
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
          <p style={{ color: "black" }}>Price: {item.price}</p>
          <div className="detail">
            <h5>Quantity: {item.quantity}</h5>
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
        <div>
          {renders()}
          <p>
            Tổng tiền:{" "}
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </p>
          <div>
            <h3>Thông tin khách hàng</h3>
            <label>
              Họ tên:
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Địa chỉ:
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </label>
            <br />
            <label>
              Điện thoại:
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handlePayment}>Đặt hàng</button>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
