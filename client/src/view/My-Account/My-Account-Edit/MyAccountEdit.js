import React from "react";
import "../../My-Account/MyAccountEdit.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function MyAccountEdit() {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/personalinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPersonalInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <section className="my-account-wrapper">
      <div className="my-account-content">
        <div className="nav-info-menu">
          <div>
            <div className="left-previousOders-content">
              <div className="header-info">
                <h2>
                  XIN CHÀO,
                  <br /> HƯNG
                </h2>
                <p>
                  <a href="">Đăng xuất</a>
                </p>
              </div>
              <ul>
                <li>
                  {" "}
                  <Link to={"/my-account/previous-orders"} className="link">
                    Lịch sử đặt hàng
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/my-account/edit"} className="link">
                    Chi tiết tài khoản
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right-history">
          <div className="previous-oders-right">
            <h3>THÔNG TIN CÁ NHÂN</h3>
            {personalInfo && (
              <div>
                <p>Họ và tên: {personalInfo.fullName}</p>
                <p>Email: {personalInfo.email}</p>
                <p>Địa chỉ: {personalInfo.address}</p>
                <p>Số điện thoại: {personalInfo.phone}</p>
              </div>
            )}
            <form>
              <div class="form-group">
                <label htmlFor="name">ID:</label>
                <input type="number" name="id" className="form-control" v />
              </div>
              <div class="form-group">
                <label for="exampleFormControlFile1">Họ tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlFile1"
                  name="NameCustumer"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2">Số điện thoại</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlFile1"
                  name="BookingDate"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlFile1"
                  name="DeliveryDate"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Địa chỉ</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlFile1"
                />
              </div>

              <div class="form-group">
                <label for="exampleFormControlTextarea1">Ngày sinh</label>
                <input
                  type="date"
                  class="form-control"
                  id="exampleFormControlFile1"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccountEdit;
