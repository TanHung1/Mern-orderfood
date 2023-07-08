import React from "react";
import "../styles/RegisterComponent.scss";
import { Link, Navigate, Router, redirect, useNavigate } from "react-router-dom";
import f6 from "../assets/f6.png";
import { toast } from "react-toastify";
import { Form, Input, Button, message, Alert, notification } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


function RegisterComponent() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {

    const { username, password, email, phonenumber } = values;

    const data = {
      username:username,
      password:password,
      email:email,
      phonenumber:phonenumber
    }
    setError(null);
    try {
      const response = await axios .post("http://localhost:5000/api/account/register",data)
      console.log(response, 'message')
      setSuccess(true);
      message.success("Đăng ký thành công")
      navigate("/login")
    } catch (error) {
      console.log(error.response?.data?.error)
      notification.error({ message: error.response?.data?.error})
    }
  };
  return (
    <div>
      <section className="register">
        <div className="register_box">
          <div className="left-register">
            <img src={f6} className="img-register" />
            <div className="left-text"></div>
          </div>
          <div className="right-register">
            <div className="info-register">
              <h3 className="register-header">Đăng ký</h3>
              <Form onFinish={handleSubmit} validateTrigger="onSubmit">
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                    {
                      pattern: /^[a-zA-ZÀ-ỹ\s]*$/,
                      message: "Họ và tên chỉ được chứa chữ cái!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item
                  name="phonenumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: "Số điện thoại phải chứa đủ 10 chữ số",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại của bạn" />
                  {/* {error === "Số điện thoại đã tồn tại" ? <label style={{ color: 'red' }}>{error}</label> : null} */}
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ email!",
                    },
                    {
                      type: "email",
                      message: "Vui lòng nhập đúng định dạng email!",
                    },
                  ]}
                >
                  <Input placeholder="Địa chỉ email của bạn" />
                  {error === "Email đã tồn tại" ? <label style={{ color: 'red' }}>{error}</label> : null}
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="submit">
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
              <hr />
              <h6>Hoặc tiếp tục với</h6>
              <button className="login-facebook">
                <i className="fa-brands fa-facebook"></i> Đăng nhập bằng
                Facebook
              </button>
              <button className="login-google">
                <i className="fa-brands fa-google"></i>Đăng nhập bằng Google
              </button>
              <p className="register-login-text">
                Bạn đã có tài khoản?{" "}
                <NavLink to="/login" activeClassName="active">
                  <a href="/login" className="go-login">
                    Đăng nhập
                  </a>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterComponent;
