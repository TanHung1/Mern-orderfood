import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ManageFood.scss";
import Footer from "../view/Footer";
import { useForm,Controller,Control } from "react-hook-form"
import { Table } from 'antd';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from "../util/api";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};


function ManageFood() {
  const schema = yup
    .object({
      nameprod: yup.string().required('Tên không được để trống'),
      image: yup.string().required("Không được để trống"),
      price: yup.string().required("Không được để trống"),
      category: yup.string().required("Phải chọn món ăn thuộc loại nào")
    })
    .required()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)
  const [inputData, setInputData] = useState({
    nameprod: "",
    price: "",
    image: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [count,setCount] = useState(1000)
  const [dialogActive, setDialogActive] = useState(false);
  const navigate = useNavigate();
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [addedProduct, setAddedProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    nameprod: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get(`${api}api/admin/get-all-products`, token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [deletedProduct, addedProduct]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Kiểm tra file có tồn tại không
    if (file) {
      // Nếu có thì định dạng file thành định dạng cho phép
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInputData((prevState) => ({ ...prevState, image: reader.result }));
        setImage(reader.result);
      };
    }else{
      setImage(error)
    }
  };
  const handleAddFood = (event) => {
  
    axios
      .post("http://localhost:5000/api/admin/create-product", inputData, token)
      .then((res) => {
        alert("Thêm món ăn thành công");
        navigate("/admin/manage-food");
        setAddedProduct(res.data._id);
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
    setFormValues({
      nameprod: "",
      price: "",
      image: "",
      category: "",
    });
  };

  function handleDelete(_id) {
    const confirm = window.confirm("Bạn có muốn xóa?");
    if (confirm) {
      axios
        .delete(`http://localhost:5000/api/admin/delete-product/${_id}`, token)
        .then((res) => {
          alert(" Xóa thành công");
          console.log(_id);
          setDeletedProduct(_id);
        });
    }
  }
  

  return (
    <section className="">
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
                <form onSubmit={handleSubmit(handleAddFood)}>
                  <label htmlFor="exampleFormControlFile1" className="text-lable">
                    Tên món ăn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên sản phẩm"
                    id="exampleFormControlFile1"
                    {...register("nameprod")}
                    onChange={(e) =>
                      setInputData({ ...inputData, nameprod: e.target.value })
                    }
                  />
                  <p style={{ color: 'red' }}>{errors.nameprod?.message}</p>                 
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlFile1"
                      className="text-lable"
                    >
                      Hình ảnh
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      {...register('image')}
                      accept="image/*"
                      id="exampleFormControlFile1"
                      onChange={handleImageChange}
                    />
                    {image && ( // Nếu đã chọn ảnh thì hiển thị ảnh đó
                      <img
                        src={image}
                        alt="Preview"
                        className="preview-image"
                      />
                    )}
                   {!error? <p style={{ color: 'red' }}>Chưa có hình ảnh</p> :null}
                  </div>
                  <div className="form-group">
              <label
                      htmlFor="exampleFormControlSelect2"
                      className="text-lable"
                    >
                      Giá tiền
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...register('price')}
                      placeholder="Nhập giá tiền"
                      id="exampleFormControlFile1"
                      onChange={(e) =>
                        setInputData({ ...inputData, price: e.target.value })
                      }
                    />
                    <p style={{ color: 'red' }}>{errors.price?.message}</p>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="text-lable"
                    >
                      Loại món ăn
                    </label>
                    <select
                      className="form-control"
                      {...register('category')}
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
                    <p style={{ color: 'red' }}>{errors.category==="Loại".message}</p>

                  <button type="submit" className="btn btn-primary">
                    Thêm món
                  </button>
                </form>
              </div>
            </div>
            <Link to="/admin/trash-food">
              <div className="trash-dish">
                <button className="trash-dish-btn">Thùng rác ({data.deleteCount})</button>
              </div>
            </Link>
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
                      {d.price && d.price.toLocaleString()}&#8363;
                    </td>
                    <td className="food-content">{d.category}</td>
                    <td className="food-content">
                      <Link
                        className="text-decoration-none btn btn-sm btn-success"
                        to={`/admin/edit-food/${d._id}`}
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
