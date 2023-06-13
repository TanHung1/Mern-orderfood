import React, { useState } from "react";
import axios from "axios";
import f6 from "../assets/f6.png";
import { NavLink } from "react-router-dom";
import { Form, Input, Button, Modal, Alert } from "antd";
import "../styles/LoginComponent.scss";

const LoginComponent = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values) => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/login",
        values
      );

      localStorage.setItem("token", JSON.stringify(response.data));

      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
      } else {
        setError("Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
      }
    }
  };

  const handleOk = () => {
    setSuccess(false);
    window.location.href = "/";
  };

  const handleCancel = () => {
    setSuccess(false);
  };

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
              {error && <Alert message={error} type="error" showIcon />}
              <Form onFinish={handleSubmit} validateTrigger="onSubmit">
                <Form.Item
                  name="identifier"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản!",
                    },
                  ]}
                  validateStatus={error ? "error" : ""}
                  errorMessage={error ? error : ""}
                >
                  <Input placeholder="Địa chỉ email hoặc số điện thoại của bạn" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                  validateStatus={error ? "error" : ""}
                  errorMessage={error ? error : ""}
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="submit">
                  Đăng nhập
                </Button>
              </Form>
              <hr />
              <h6>Hoặc đăng nhập với</h6>
              <button className="login-facebook">
                <i className="fa-brands fa-facebook"></i> Đăng nhập bằng
                Facebook
              </button>
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
      <Modal
        title="Đăng nhập thành công"
        visible={success}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn đã đăng nhập thành công!</p>
      </Modal>
    </div>
  );
};

export default LoginComponent;
