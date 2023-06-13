import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import "../styles/EditFood.scss";

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function EditFood() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    nameprod: "",
    price: "",
    image: "",
    category: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${_id}`)
      .then((response) => {
        const { nameprod, price, image, category } = response.data.product;
        setInputData({
          ...inputData,
          nameprod: nameprod,
          price: price,
          image: image,
          category: category,
        });
      })
      .catch((err) => console.log(err));
  }, [_id]);

  const handleEditFood = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/admin/${_id}/update-product`,
        inputData,
        token
      )
      .then((res) => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        message.error("Chỉnh sửa món ăn thất bại");
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInputData((prevState) => ({ ...prevState, image: reader.result }));
      };
    }
  };

  const handleOk = () => {
    setIsSuccess(false);
    navigate("/manage-food");
  };

  return (
    <div className="container">
      <h2 className="h2-editFood mt-4" style={{ paddingTop: "70px" }}>
        Chỉnh sửa món ăn
      </h2>
      <form onSubmit={handleEditFood}>
        <div className="form-group">
          <label htmlFor="nameprod" className="label-editFood">
            Tên món
          </label>
          <input
            type="text"
            className="form-control"
            id="nameprod"
            name="nameprod"
            value={inputData.nameprod}
            onChange={(e) =>
              setInputData((prevState) => ({
                ...prevState,
                nameprod: e.target.value,
              }))
            }
            placeholder="Nhập tên món ăn"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="label-editFood">
            Giá
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={inputData.price}
            onChange={(e) =>
              setInputData((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
            placeholder="Nhập giá món ăn"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="label-editFood">
            Hình ảnh
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control-file"
            id="exampleFormControlFile1"
          />
          {inputData.image && (
            <img
              src={inputData.image}
              alt="Preview"
              className="preview-image mt-2"
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category" className="label-editFood">
            Loại
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={inputData.category}
            onChange={(e) =>
              setInputData((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          >
            <option value="">Chọn loại</option>
            <option value="pizza">Pizza</option>
            <option value="desserts">Tráng miệng</option>
            <option value="drink">Đồ uống</option>
            <option value="side">Món ăn kèm</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ marginBottom: "50px" }}
        >
          Cập nhật
        </button>
      </form>
      <Modal
        visible={isSuccess}
        onOk={handleOk}
        onCancel={() => setIsSuccess(false)}
      >
        <p>Chỉnh sửa món ăn thành công</p>
      </Modal>
    </div>
  );
}

export default EditFood;
