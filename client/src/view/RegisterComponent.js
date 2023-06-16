import React from "react";
import "../styles/RegisterComponent.scss";
import { Link, useNavigate } from "react-router-dom";
import f6 from "../assets/f6.png";
import { toast } from "react-toastify";
import { Form, Input, Button, Alert, Modal } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";


function RegisterComponent() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { username, password, email, phonenumber } = values;

    let regobj = { username, password, email, phonenumber };

    fetch("http://localhost:5000/api/account/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => {
        setSuccess(true);
        setModalVisible(true);
        toast.success("Registered successfully.");
      })
      .catch((err) => {
        setError("Failed :" + err.message);
        toast.error("Failed :" + err.message);
      });
  };

  const handleModalOk = () => {
    setModalVisible(false);
    navigate("/login");
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    navigate("/register");
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
              {error && <Alert message={error} type="error" showIcon />}
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
      <Modal
        title="Đăng ký thành công"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Tài khoản của bạn đã được đăng ký thành công.</p>
        <p>Vui lòng đăng nhập để tiếp tục sử dụng.</p>
      </Modal>
    </div>
  );
}

export default RegisterComponent;
