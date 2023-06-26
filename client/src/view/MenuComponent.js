import "../styles/MenuComponent.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, notification, message, Space, Select } from "antd";

function MenuComponent() {
  const [data, setData] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
    setSelectedCategory();
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartItems.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      message.warning("Đã có sản phẩm này trong giỏ hàng");
    } else {
      message.success("Thêm sản phẩm thành công");
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartItemCount(cartItemCount + 1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  const handleShowAllClick = () => {
    setSelectedCategory("");
    setShowAll(true);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSelectedCategory("");
    setShowAll(false);
  };

  const renders = () => {
    let productsToRender = data?.products || [];

    if (!showAll && selectedCategory) {
      productsToRender = productsToRender.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (searchValue) {
      productsToRender = productsToRender.filter((item) =>
        item.nameprod.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortType === "asc") {
      productsToRender = productsToRender.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
      productsToRender = productsToRender.sort((a, b) => b.price - a.price);
    }

    return productsToRender?.map((item, index) => {
      return (
        <div key={index}>
          <div className="card">
            <Link to={`/detail-product/${item._id}`}>
              <img
                style={{ width: "100%", height: 250 }}
                className=""
                src={item.image}
                alt="Card image cap"
              />
            </Link>
            <div className="card-body">
              <Link
                to={`/detail-product/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <h5
                  className="card-title"
                  style={{ fontSize: 15, width: "100%" }}
                >
                  {item.nameprod?.length > 10
                    ? `${item.nameprod?.slice(0, 35)}...`
                    : item.nameprod}
                </h5>
              </Link>
              <p className="card-price">
                {item.price ? item.price.toLocaleString() : ""}&#8363;
              </p>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary"
                onClick={() => handleAddToCart(item)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h1 className="menu-header">Thực Đơn Món Ăn</h1>

      <div className="category-buttons">
        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={handleShowAllClick}
        >
          Tất cả
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
          Tráng miệng
        </button>
        <button
          className={selectedCategory === "drink" ? "active" : ""}
          onClick={() => handleCategoryClick("drink")}
        >
          Đồ uống
        </button>
        <button
          className={selectedCategory === "side" ? "active" : ""}
          onClick={() => handleCategoryClick("side")}
        >
          Đồ ăn kèm
        </button>
      </div>

      <form
        style={{ width: "25%", margin: "auto" }}
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          placeholder="Tìm kiếm món ăn"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </form>
      <div className="sort-price">
        <label>Sắp xếp theo </label>
        <Space>
          <Select value={sortType} onChange={(e) => setSortType(e)}
          options={[
            {
              value: 'none',
              label: 'Không sắp xếp',
            },
            {
              value: 'asc',
              label: 'Giá tăng dần',
            },
            {
              value: 'desc',
              label: 'Giá giảm dần',
            },
            
          ]}
          />
        </Space>
        {/* <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">Không sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select> */}
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
