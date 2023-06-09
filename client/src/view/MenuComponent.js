import "../styles/MenuComponent.scss";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/actions";
import "animate.css/animate.min.css";
import classNames from "classnames";

function MenuComponent() {
  const [data, setData] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {});
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShowAllClick = () => {
    setSelectedCategory("");
    setShowAll(true);
  };

  const renders = (category) => {
    const productsToRender = category
      ? data.products?.filter((item) => item.category === category)
      : data.products || [];

    return productsToRender.map((item, index) => {
      return (
        <div key={index} className="animate__animated animate__fadeIn">
          <div className="card animate__animated animate__zoomIn">
            <img className="" src={item.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{item.nameprod}</h5>
              <p className="card-text">{item.description}</p>
              <p className="card-price">{item.price.toLocaleString()}&#8363;</p>
              <button
                className="btn btn-primary"
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
      <h1 className="menu-header">Thực Đơn Món Ăn</h1>
      <div className="category-buttons">
        <button
          className={classNames({
            active: !selectedCategory,
            "animate__animated animate__bounce": selectedCategory === "",
          })}
          onClick={handleShowAllClick}
        >
          All
        </button>
        <button
          className={classNames({
            active: selectedCategory === "pizza",
            "animate__animated animate__bounce": selectedCategory === "pizza",
          })}
          onClick={() => handleCategoryClick("pizza")}
        >
          Pizza
        </button>
        <button
          className={classNames({
            active: selectedCategory === "desserts",
            "animate__animated animate__bounce":
              selectedCategory === "desserts",
          })}
          onClick={() => handleCategoryClick("desserts")}
        >
          Desserts
        </button>
        <button
          className={classNames({
            active: selectedCategory === "drink",
            "animate__animated animate__bounce": selectedCategory === "drink",
          })}
          onClick={() => handleCategoryClick("drink")}
        >
          Drink
        </button>
        <button
          className={classNames({
            active: selectedCategory === "side",
            "animate__animated animate__bounce": selectedCategory === "side",
          })}
          onClick={() => handleCategoryClick("side")}
        >
          Side
        </button>
      </div>
      <div>
        <div className="cards">{renders(selectedCategory)}</div>
      </div>
    </>
  );
}

export default MenuComponent;
