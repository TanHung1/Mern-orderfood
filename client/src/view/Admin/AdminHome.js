import React from "react";
import "../Admin/AdminHome.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
function AdminHome() {
  const [haveview, viewchange] = useState(false);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     GetUserAccess();
  //   }, []);
  // const GetUserAccess = () => {
  //     const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
  //     fetch("http://localhost:3030/roleaccess?role=" + userrole + "&menu=customer").then(res => {
  //         if (!res.ok) {
  //             navigate('/');
  //         alert('Đang quay trở lại trang chủ');
  //             return false;
  //         }
  //         return res.json();
  //     }).then(res => {
  //         console.log(res);
  //         if (res.length > 0) {
  //             viewchange(true);
  //             let userobj = res[0];

  //         }else{
  //             navigate('/');
  //         alert('Bạn không được phép truy cập');
  //         }
  //     })
  // }
  return (
    <section className="account-admin-wrapper ">
      <div className="account-admin-content">
        <div className="nav-info-menu">
          <div>
            <div className="left-admin-content">
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
                  <Link to={"/manage-food"} className="link">
                    Quản lý thức ăn
                  </Link>
                </li>
                <li>
                  <Link to={"/manage-custumer"} className="link">
                    Quản lý khách hàng
                  </Link>
                </li>
                <li>
                  <Link to={"/manage-staff"} className="link">
                    Quản ký nhân viên
                  </Link>
                </li>
                <li>
                  <Link to={"/my-account/previous-orders"} className="link">
                    Thống kê
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right-history">
          <div className="admin-right "></div>
        </div>
      </div>
    </section>
  );
}

export default AdminHome;
