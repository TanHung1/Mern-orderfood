import React from "react";
import "./RegisterComponent.scss";
import { Link, useNavigate } from "react-router-dom";
import about from "../../assets/about-img.png";
import { toast } from "react-toastify";

import { useState } from "react";
import { NavLink } from "react-router-dom";
function RegisterComponent() {
  const [username, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phonenumber, phonechange] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";

    if (username === null || username === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { username, password, email, phonenumber };
    if (IsValidate()) {
      //console.log(regobj);
      fetch("http://localhost:5000/api/account/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };
  return (
    <div>
      <section className="register">
        <div className="register_box">
          <div className="left-register">
            <img src={about} className="img-register" />
            <div className="left-text"></div>
          </div>
          <div className="right-register">
            <div className="info-register">
              <form onSubmit={handlesubmit}>
                <h3>Đăng ký</h3>

                <input
                  value={username}
                  onChange={(e) => namechange(e.target.value)}
                  type="text"
                  placeholder="nhập họ và tên"
                />
                <input
                  value={phonenumber}
                  onChange={(e) => phonechange(e.target.value)}
                  placeholder="Số điện thoại của bạn"
                />
                <input
                  value={email}
                  onChange={(e) => emailchange(e.target.value)}
                  placeholder="Địa chỉ email của bạn"
                />

                <input
                  value={password}
                  onChange={(e) => passwordchange(e.target.value)}
                  type="password"
                  placeholder="Mật khẩu"
                />

                <button type="submit" className="submit">
                  Register
                </button>
                <hr />
                <h6>Hoặc tiếp tục với</h6>
                <button className="login-facebook">
                  <i class="fa-brands fa-facebook"></i> Đăng nhập bằng facebook
                </button>
                <button className="login-google">
                  <i class="fa-brands fa-google"></i>Đăng nhập bằng google
                </button>
                <p>
                  Bạn đã có tài khoản?
                  <NavLink to="/login" activeClassName="active">
                    <a href="/login" className="go-login">
                      Đăng nhập
                    </a>
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterComponent;
