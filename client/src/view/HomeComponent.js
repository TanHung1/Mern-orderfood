import React from "react";
import "../styles/HomeComponent.scss";

import MenuComponent from "../view/MenuComponent";
import AboutComponent from "../view/AboutComponent";
import o1 from "../assets/o1.jpg";
import o2 from "../assets/o2.jpg";
import f1 from "../assets/f1.png";

import f3 from "../assets/f3.png";
import f7 from "../assets/f7.png";
import f9 from "../assets/f9.png";

function HomeComponent() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="slider-container">
        <div className="slider">
          <div className="slides">
            <div id="slides__1" className="slide">
              <span className="slide__text">
                <img src={f1} alt="Food 1" />
              </span>
              <a className="slide__prev" href="#slides__4" title="Next"></a>
              <a className="slide__next" href="#slides__2" title="Next"></a>
            </div>
            <div id="slides__2" className="slide">
              <span className="slide__text">
                <img src={f3} alt="Food 3" />
              </span>
              <a className="slide__prev" href="#slides__1" title="Prev"></a>
              <a className="slide__next" href="#slides__3" title="Next"></a>
            </div>
            <div id="slides__3" className="slide">
              <span className="slide__text">
                <img src={f7} alt="Food 7" />
              </span>
              <a className="slide__prev" href="#slides__2" title="Prev"></a>
              <a className="slide__next" href="#slides__4" title="Next"></a>
            </div>
            <div id="slides__4" className="slide">
              <span className="slide__text">
                <img src={f9} alt="Food 9" />
              </span>
              <a className="slide__prev" href="#slides__3" title="Prev"></a>
              <a className="slide__next" href="#slides__1" title="Prev"></a>
            </div>
          </div>
          <div className="slider__nav">
            <a className="slider__navlink" href="#slides__1"></a>
            <a className="slider__navlink" href="#slides__2"></a>
            <a className="slider__navlink" href="#slides__3"></a>
            <a className="slider__navlink" href="#slides__4"></a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="oder">
          <div className="grid-container">
            <div className="grid-item">
              <div className="img-oder">
                <img src={o1} alt="Order 1" className="img-home" />
              </div>
              <div className="detail-oder">
                <h5>Giảm Giá</h5>
                <h6>
                  <span>20%</span>
                </h6>
                <a href="/menu">Đặt hàng ngay</a>
              </div>
            </div>

            <div className="grid-item">
              <div className="img-oder">
                <img src={o2} alt="Order 2" className="img-home" />
              </div>
              <div className="detail-oder">
                <h5>Giảm Giá</h5>
                <h6>
                  <span>20%</span>
                </h6>
                <a href="/menu">Đặt hàng ngay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MenuComponent />

      <AboutComponent />

      {/* Add a button at the bottom right corner of the page */}
      <button className="scroll-to-top" onClick={handleScrollToTop}>
        <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default HomeComponent;
