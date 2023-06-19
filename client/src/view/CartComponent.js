import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import "../styles/CartComponent.scss";

function CartComponent() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleIncreaseQuantity = (item) => {
    const newItem = { ...item, quantity: item.quantity + 1 };
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id);
    const newCart = [...cartItems];
    newCart.splice(index, 1, newItem);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      handleRemoveItem(item);
      return;
    }
    const newItem = { ...item, quantity: item.quantity - 1 };
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id);
    const newCart = [...cartItems];
    newCart.splice(index, 1, newItem);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemoveItem = (item) => {
    const newCart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const renders = () => {
    return cartItems.map((item) => {
      console.log(item, "abadada");
      return item.user ? (
        ""
      ) : (
        <div key={item._id}>
          <div>
            <h5 class="card-title">{item.nameprod}</h5>
            <h5>{item.name}</h5>
            <img src={item.image} alt={item.name} style={{ width: "10%" }} />
            <p>Giá: {item.price.toLocaleString()}&#8363;</p>
            <div className="detail">
              <button onClick={() => handleDecreaseQuantity(item)}>-</button>
              <h5>{item.quantity}</h5>
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              <button onClick={() => handleRemoveItem(item)}>Xóa</button>
            </div>
          </div>
          <hr />
        </div>
      );
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleCheckout = () => {
    if (!localStorage.getItem("token")) {
      notification.warning({
        message: "Bạn cần đăng nhập để tiếp tục đặt hàng",
        duration: 2,
      });
      navigate("/login");
    } else {
      //localStorage.getItem("user");
      navigate("/checkout");
    }
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống</p>
      ) : (
        <div>
          {renders()}
          <p>Tổng tiền: {getTotalPrice().toLocaleString()}&#8363;</p>
          <button
            className="text-decoration-none btn btn-sm btn-success"
            onClick={handleCheckout}
          >
            Tiến hành đặt hàng
          </button>
        </div>
      )}
    </div>
  );
}

export default CartComponent;
