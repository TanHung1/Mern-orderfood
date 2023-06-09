import React, { useState } from "react";
import axios from "axios";
import about from "../assets/about-img.png";
import { NavLink } from "react-router-dom";
import "../styles/LoginComponent.scss";
const LoginComponent = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/login",
        { phonenumber, password }
      );
      console.log(phonenumber, password);
  
      localStorage.setItem("token", JSON.stringify(response.data));

      window.location.href = "/";
      console.log(response);
      alert("thanh cong", localStorage);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
      }
    }
  };
  const isFormValid = phonenumber && password;
  return (
    <div>
      <section class="login">
        <div class="login_box">
          <div class="left-login">
            <img src={about} class="img-login" />
            <div class="left-text"></div>
          </div>
          <div class="right-login">
            <div class="info-login">
              <h3 class="login-header">Đăng nhập</h3>
              {error && <p>{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  value={phonenumber}
                  onChange={handleEmailChange}
                  placeholder="Địa chỉ email của bạn"
                />

                <input
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Mật khẩu"
                />

                <button type="submit" class="submit" disabled={!isFormValid}>
                  Đăng nhập
                </button>
              </form>
              <hr />
              <h6>Hoặc đăng nhập với</h6>
              <button class="login-facebook">
                <i class="fa-brands fa-facebook"></i> Đăng nhập bằng Facebook
              </button>
              <button class="login-google">
                <i class="fa-brands fa-google"></i> Đăng nhập bằng Google
              </button>
              <p class="login-register-text">
                Bạn chưa có tài khoản?{" "}
                <NavLink to="/register" activeClassName="active">
                  <a href="/register" class="go-register">
                    Đăng ký
                  </a>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginComponent;
