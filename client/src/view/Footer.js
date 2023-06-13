import React from "react";
import "../styles/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>
              Khách hàng của Pizza của chúng tôi có thể tùy chọn các loại
              topping khác nhau để tạo ra một chiếc pizza độc đáo theo sở thích
              của mình. Chúng tôi rất cảm ơn sự ủng hộ của khách hàng và sẽ luôn
              nỗ lực để mang đến cho họ những sản phẩm chất lượng và dịch vụ tốt
              nhất.
            </p>
          </div>
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <ul>
              <li>
                Địa chỉ: Đường số 3, CVPM Quang Trung, P. Tân Chánh Hiệp, Q.12,
                TP.HCM
              </li>
              <li>Phone: (123) 456-7890</li>
              <li>
                Email:
                <ul>
                  <li>truongtanhung1910@gmail.com</li>
                  <li> mincongtran20901@gmail.com</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Follow Us</h3>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
