import React, { useState } from "react";
import axios from "axios";
import f6 from "../assets/f6.png";
import { Form, Input, Button, Modal, Alert, message } from "antd";
import about from "../assets/about-img.png";
import { NavLink, useRoutes,useNavigate } from "react-router-dom";
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
        if(response?.data){          
          setTimeout(()=>{     
            message.success("Đăng nhập thành công")     
            window.location.replace("/")
          },500)
        }
      setSuccess(true);
    } catch (error) {console.log(error,'tk')
      if (error.response.data.error) {
        setError(error.response.data.error)
      }
    }
  };

  const handleOk = () => {
    setSuccess(false);
    navigate("/");
  };

  // const handleCancel = () => {
  //   setSuccess(false);
  //   navigate("/login");
  // };

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
                  validateStatus={error ? "error" : ""}
                  errorMessage={error ? error : ""}
                >
                  <Input placeholder="Địa chỉ email hoặc số điện thoại của bạn" />

                  {error==="Sai thông tin đăng nhập"? <Alert message={error} type="error" showIcon />:null}
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
                  {error==="Sai mật khẩu"? <Alert message={error} type="error" showIcon />:null}
                </Form.Item>
               
                <Button  htmlType="submit" className="submit">
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
      {/* <Modal
        title="Đăng nhập thành công"
        visible={success}
        onOk={handleOk}
        cancelButtonProps={false}
      >
        <p>Bạn đã đăng nhập thành công!</p>
      </Modal> */}
    </div>
  );
};

export default LoginComponent;
