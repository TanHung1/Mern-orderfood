import React, { useState } from "react";
import axios from "axios";
import f6 from "../assets/f6.png";
import { Form, Input, Button, Modal, Alert, message } from "antd";
import OAuth2Login from "react-simple-oauth2-login";
import { NavLink, useRoutes, useNavigate } from "react-router-dom";
import { notification } from "antd";

import "../styles/LoginComponent.scss";

const LoginComponent = () => {
  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  console.log(error);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/login",
        values
      );

      localStorage.setItem("token", JSON.stringify(response.data));
      if (response?.data) {
        message.success("Đăng nhập thành công");
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    } catch (error) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      }
    }
  };

  const onSuccess = async (res) => {
    const token = res.access_token;
    const result = await fetch(
      `https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${token}`
    );
    const profile = await result.json();
    const { id, name } = profile;
    // const avatar = profile.picture.data.url;
    // const response = await axios.post(
    //   "http://localhost:5000/api/account/login/facebook",
    //   {
    //     id,
    //     name,
    //     avatar,
    //   }
    // );
    // localStorage.setItem("token", JSON.stringify(response.data));
    // if (response?.data) {
    //   message.success("Đăng nhập thành công");
    //   setTimeout(() => {
    //     window.location.replace("/");
    //   }, 500);
    // }
    console.log(profile);
  };

  const onFailure = (res) => {};

  return (
    <div>
      <section className="login">
        <div className="login_box">
          <div className="left-login">
            <img src={f6} className="img-login" />
            <div className="left-text"></div>
          </div>
          <div className="right-login">
            <div className="info-login">
              <h3 className="login-header">Đăng nhập</h3>

              <Form onFinish={handleSubmit} validateTrigger="onSubmit">
                <Form.Item
                  name="identifier"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản!",
                    },
                  ]}
                  // validateStatus={error ? "error" : ""}
                  // errorMessage={error ? error : ""}
                >
                  <Input placeholder="Địa chỉ email hoặc số điện thoại của bạn" />

                  {error === "Email hoặc số điện thoại sai" ? (
                    <label style={{ color: "red" }}>{error}</label>
                  ) : null}
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" />
                  {error === "Sai mật khẩu" ? (
                    <label style={{ color: "red" }}>{error}</label>
                  ) : null}
                </Form.Item>

                <Button htmlType="submit" className="submit">
                  Đăng nhập
                </Button>
              </Form>
              <hr />
              <h6>Hoặc đăng nhập với</h6>
              <OAuth2Login
                className="login-facebook"
                authorizationUrl="https://www.facebook.com/dialog/oauth"
                responseType="token"
                clientId="259667280114120"
                redirectUri="http://localhost:3000/login"
                onSuccess={onSuccess}
                onFailure={onFailure}
              >
                <i className="fa-brands fa-facebook"></i> Đăng nhập bằng
                Facebook
              </OAuth2Login>
              <button className="login-google">
                <i className="fa-brands fa-google"></i> Đăng nhập bằng Google
              </button>
              <p className="login-register-text">
                Bạn chưa có tài khoản?{" "}
                <NavLink to="/register" activeClassName="active">
                  <a href="/register" className="go-register">
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
