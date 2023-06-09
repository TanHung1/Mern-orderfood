import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ManageFood.scss";

function ManageFood() {
  const [inputData, setInputData] = useState({
    nameprod: "",
    price: "",
    image: "",
    category: "",
  });
  const [data, setData] = useState([]);
  const [dialogActive, setDialogActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  const handleOpenDialog = (event) => {
    event.preventDefault();
    setDialogActive(true);
  };

  const handleCloseDialog = (event) => {
    event.preventDefault();
    setDialogActive(false);
  };

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

  return (
    <section className="account-admin-wrapper">
      <div className="account-food-content">
        <div className="right-history">
          <div className="admin-right">
            <h3 className="list-food">DANH SÁCH MÓN ĂN</h3>
            <div className="add-dish">
              <a
                className="dialog-btn"
                href="#my-dialog"
                onClick={handleOpenDialog}
              >
                Thêm món ăn
              </a>
            </div>

            <div
              className={`dialog ${dialogActive ? "active" : ""}`}
              id="my-dialog"
            >
              <a
                href="#"
                className="overlay-close"
                onClick={handleCloseDialog}
              ></a>

              <div className="dialog-body">
                <a
                  className="dialog-close-btn"
                  href="#"
                  onClick={handleCloseDialog}
                >
                  &times;
                </a>
                <h3>Thêm món ăn</h3>
                <form onSubmit={handleAddFood}>
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="text-lable"
                    >
                      name food
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nameprod"
                      placeholder="nhập tên món"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, nameprod: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlFile1"
                      className="text-lable"
                    >
                      Img
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      placeholder="nhập anh"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, image: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlSelect2"
                      className="text-lable"
                    >
                      Giá
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="nhập gia"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="text-lable"
                    >
                      Loại
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setInputData({ ...inputData, category: e.target.value })
                      }
                    >
                      <option>Loại</option>
                      <option>pizza</option>
                      <option>desserts</option>
                      <option>drink</option>
                      <option>side</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <table className="food-table">
              <thead>
                <tr>
                  <th className="food-header">Mã Món</th>
                  <th className="food-header">Tên món</th>
                  <th className="food-header">Hình ảnh</th>
                  <th className="food-header">Giá</th>
                  <th className="food-header">Loại</th>
                  <th className="food-header">Chỉnh sửa</th>
                  <th className="food-header">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {data.products?.map((d, i) => (
                  <tr key={i}>
                    <td className="food-content">{i + 1}</td>
                    <td className="food-content">{d.nameprod}</td>
                    <td className="food-content">
                      <img
                        src={d.image}
                        className="img-manageFood"
                        alt="food"
                      />
                    </td>
                    <td className="food-content">
                      {d.price.toLocaleString()}&#8363;
                    </td>
                    <td className="food-content">{d.category}</td>
                    <td className="food-content">
                      <Link
                        className="text-decoration-none btn btn-sm btn-success"
                        to={`/Edit-food/${d._id}`}
                        onClick={() => console.log(d)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </td>
                    <td className="food-content">
                      <button
                        className="text-decoration-none btn btn-sm btn-danger"
                        onClick={(e) => handleDelete(d._id)}
                      >
                        <i className="fa-solid fa-trash"></i>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageFood;
