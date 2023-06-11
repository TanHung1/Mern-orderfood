import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditFood.scss";
function EditFood() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    nameprod: "",
    price: "",
    image: "",
    category: "",
  });

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
      .put(`http://localhost:5000/api/admin/${_id}/update-product`, inputData)
      .then((res) => {
        alert("Chỉnh sửa món ăn thành công");
        navigate("/manage-food");
        console.log(inputData);
      })
      .catch((err) => {
        console.log(err);
        alert("Chỉnh sửa món ăn thất bại");
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
  return (
    <div>
      <h2 className="h2-editFood">Chỉnh sửa món ăn</h2>
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
            type="file" // Sử dụng input với type là "file"
            name="image"
            accept="image/*" // Giới hạn kiểu file cho phép được chọn là các định dạng hình ảnh
            onChange={handleImageChange}
            class="form-control"
            id="exampleFormControlInput1"
          />
          {inputData.image && ( // Nếu đã chọn ảnh thì hiển thị ảnh đó
            <img
              src={inputData.image}
              alt="Preview"
              className="preview-image"
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
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
  );
}

export default EditFood;
