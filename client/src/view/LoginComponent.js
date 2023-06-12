import React, { useState } from "react";
import axios from "axios";
import about from "../assets/about-img.png";
import { NavLink, useRoutes } from "react-router-dom";
import {notification} from 'antd'
import "../styles/LoginComponent.scss";
const LoginComponent = () => {

  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setidentifier(event.target.value);
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
        { identifier, password }
      );
      console.log(identifier, password);
      localStorage.setItem("token" , JSON.stringify(response.data));

    
      console.log(response);
      notification.success({
        message:response?.data?.success,
        style:{
          marginTop:50,
      
        },
      })
   
      setTimeout(()=>{
        window.location.href = "/";
      },200)
      // alert(response?.data?.success
      //   , localStorage);
  
    } catch (error) {
      notification.error({
        message:error.response?.data?.error,
        style:{
          marginTop:50
        }
      })

    }
  };
  const isFormValid = identifier && password;
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
                  value={identifier}
                  onChange={handleEmailChange}
                  placeholder="Địa chỉ email hoặc số điện thoại của bạn"
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
