import "../styles/MenuComponent.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
function MenuComponent() {
  const [data, setData] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(cartItemCount, "count");
  const [selectedCategory, setSelectedCategory] = useState("");
  // Thêm state cho "Hiển thị tất cả"
  const [showAll, setShowAll] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
  const user = localStorage.getItem("token");
  console.log(user);
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartItems, "ádsad");
    const index = cartItems.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      notification.warning({
        message: "Đã có sản phẩm này trong giỏ hàng",
        style: {},
        placement: "bottomRight",
      });
    } else {
      notification.success({
        message: "Thêm sản phẩm thành công",
        placement: "bottomRight",
      });
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartItemCount(cartItemCount + 1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  // Xử lý sự kiện "Hiển thị tất cả"
  const handleShowAllClick = () => {
    setSelectedCategory("");
    setShowAll(true);
  };

  const renders = () => {
    const productsToRender = selectedCategory
      ? data.products?.filter((item) => item.category === selectedCategory)
      : data.products || [];

    return productsToRender.map((item, index) => {
      return (
        <div key={index}>
          <div class="card">
            <img
              style={{ width: "100%", height: 250 }}
              class=""
              src={item.image}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title" style={{ fontSize: 15, width: "100%" }}>
                {item.nameprod?.length > 10
                  ? `${item.nameprod?.slice(0, 35)}...`
                  : item.nameprod}
              </h5>
              <p class="card-text">{item.description}</p>
              <p class="card-price">
                {item.price ? item.price.toLocaleString() : ""}&#8363;
              </p>

              <button
                style={{ marginBottom: 20 }}
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
    <>
      <h1 class="menu-header">Thực Đơn Món Ăn</h1>
      <div className="category-buttons">
        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={handleShowAllClick}
        >
          All
        </button>
        <button
          className={selectedCategory === "pizza" ? "active" : ""}
          onClick={() => handleCategoryClick("pizza")}
        >
          Pizza
        </button>

        <button
          className={selectedCategory === "desserts" ? "active" : ""}
          onClick={() => handleCategoryClick("desserts")}
        >
          Desserts
        </button>
        <button
          className={selectedCategory === "drink" ? "active" : ""}
          onClick={() => handleCategoryClick("drink")}
        >
          Drink
        </button>
        <button
          className={selectedCategory === "side" ? "active" : ""}
          onClick={() => handleCategoryClick("side")}
        >
          Side
        </button>
      </div>

      <div>
        <div className="cards">{renders()}</div>
      </div>
      <button className="scroll-to-top" onClick={handleScrollToTop}>
        <i className="fa fa-arrow-up"></i>
      </button>
    </>
  );
}

export default MenuComponent;
