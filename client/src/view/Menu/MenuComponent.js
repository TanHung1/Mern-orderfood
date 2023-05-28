import "./MenuComponent.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

function MenuComponent() {
  const [data, setData] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCartItemCount(itemCount);
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartItems.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      cartItems[index].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const itemCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCartItemCount(itemCount);
  };

  const renders = () => {
    return data.products?.map((item, index) => {
      return (
        <div key={index}>
          <div class="card">
            <img class="" src={item.image} alt="Card image cap" />

            <div class="card-body">
              <h5 class="card-title">{item.nameprod}</h5>
              <p class="card-text">{item.description}</p>
              <p class="card-price">{item.price}</p>
              <button
                class="btn btn-primary"
                onClick={() => handleAddToCart(item)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="" style={{ color: "black" }}>
        Sản phẩm hiện đang có trong giỏ hàng: {cartItemCount}
      </div>
      <div className="cards">{renders()}</div>
    </div>
  );
}

export default MenuComponent;
