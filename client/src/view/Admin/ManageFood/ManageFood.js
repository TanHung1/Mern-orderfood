import React from "react";
import "./ManageFood.scss";
import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ManageFood() {
  const [inputData, setInputData] = useState({
    nameprod: "",
    price: "",
    image: "",
  });
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });
  const handleAddFood = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/admin/create-product", inputData)
      .then((res) => {
        alert("Thêm món ăn thành công");
        navigate("/manage-food");
      })
      .catch((err) => {
        console.log(err);
        alert("Thêm món ăn thất bại");
      });
  };

  return (
    <section className="account-admin-wrapper ">
      <div className="account-food-content">
        <div className="nav-info-menu">
          <div>
            <div className="left-food-content">
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
          <div className="admin-right ">
            <h3>DANH SÁCH MÓN ĂN</h3>
            <div className="add-dish">
              <a className="dialog-btn" href="#my-dialog">
                Thêm món ăn
              </a>
            </div>

            <div class="dialog overlay" id="my-dialog">
              <a href="#" class="overlay-close"></a>

              <div class="dialog-body">
                <a class="dialog-close-btn" href="#">
                  &times;
                </a>
                <h3>Thêm món ăn</h3>
                <form onSubmit={handleAddFood}>
                  <div class="form-group">
                    <label
                      for="exampleFormControlInput1"
                      className="text-lable"
                    >
                      name food
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="nameprod"
                      placeholder="nhập tên món"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, nameprod: e.target.value })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlFile1" className="text-lable">
                      Img
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="image"
                      placeholder="nhập anh"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, image: e.target.value })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect2"
                      className="text-lable"
                    >
                      Giá
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="price"
                      placeholder="nhập gia"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, price: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <table className="food-table ">
              <tr>
                <th className="food-header">Mã Món</th>
                <th className="food-header">Tên món</th>
                <th className="food-header">Hình ảnh</th>
                <th className="food-header">Giá</th>
                <th className="food-header">Mô tả</th>
                <th className="food-header">Chỉnh sửa</th>
                <th className="food-header">Xóa</th>
              </tr>
              {data.products?.map((d, i) => (
                <tr key={i}>
                  <td className="food-content">{d._id}</td>
                  <td className="food-content">{d.nameprod}</td>
                  <td className="food-content">
                    {" "}
                    <img src={d.image} className="img-manageFood" />{" "}
                  </td>
                  <td className="food-content">{d.price}đ</td>
                  <td className="food-content">{d.description}</td>
                  <td className="food-content">
                    <Link
                      className="text-decoration-none btn btn-sm btn-success"
                      to={`/Edit-food/${d._id}`}
                      onClick={() => console.log(d)}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td className="food-content">
                    <button
                      className="text-decoration-none btn btn-sm btn-danger"
                      onClick={(e) => handleDelete(d._id)}
                    >
                      <i class="fa-solid fa-trash"></i>{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
  function handleDelete(_id) {
    const confirm = window.confirm("Bạn có muốn xóa?");
    if (confirm) {
      axios
        .delete(`http://localhost:5000/api/admin/${_id}/delete-product`)
        .then((res) => {
          alert(" Xóa thành công");
          console.log(_id);
        });
    }
  }
}

export default ManageFood;
