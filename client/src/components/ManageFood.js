import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ManageFood.scss";
import Footer from "../view/Footer";
import { useForm, Controller, Control } from "react-hook-form"
import { Button, Table, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
  const [count, setCount] = useState(1000)
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
         
      axios
        .get(`http://localhost:5000/api/admin/get-all-products`, token)
       .then((res)=>{
        setData(res.data)
       }) 
    .catch ((error) =>
      console.log(error));      
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
    } else {
      setImage(error)
    }
  };
  const handleAddFood = (event) => {

    axios
      .post("http://localhost:5000/api/admin/create-product", inputData, token)
      .then((res) => {
        message.success("Thêm món ăn thành công")
        setInputData({
          nameprod: "",
          price: "",
        })
        navigate("/admin/manage-food");
        setAddedProduct(res.data._id);
      })
      .catch((err) => {       
        message.error("Thêm thất bại")
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

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async (_id) => {
    setOpen(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/delete-product/${_id}`, token);
      if (response) {
        message.success("Xóa thành công");
      }
      setDeletedProduct(_id);

    } catch (error) {
      message.error("Xóa thất bại");
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: "10%",
      align: "center",
      render: (_id) => <span>{_id}</span>,

    },
    {
      title: 'Tên món',
      dataIndex: 'nameprod',
      key: 'nameprod',
      width: "40%",
      align: "center",
      render: (nameprod) => <span>{nameprod}</span>
    },
    {
      title: 'Hình',
      dataIndex: 'image',
      key: 'image',
      width: "20%",
      align: "center",
      render: (image) => <img style={{ maxWidth: 100 }} src={image}></img>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: "center",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
      render: (price) => <span>{price}</span>
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
      align: "center",
      filters: [
        {
          text: 'pizza',
          value: 'pizza',
        },
        {
          text: 'drink',
          value: 'drink',
        },
        {
          text: 'desserts',
          value: 'desserts',
        },
        {
          text: 'side',
          value: 'side',
        }
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      render: (category) => <span>{category}</span>
    },
    {
      title: 'Lựa chọn',
      key: 'action',
      align: "center",
      render: (record) => (
        <span>
          <Link to={`/admin/edit-food/${record._id}`}>
          <Button type="primary">Sửa</Button>
          </Link>
          <Popconfirm
            placement="top"
            title="Lưu ý"
            description="Bạn vẫn tiếp tục muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            visible={open}
            onCancel={handleCancel}
          >
            <Button style={{ marginLeft: 10 }} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>

        </span>
      )
    }
  ]

  return (
    <section className="">
      <div className="account-food-content">
        <div className="right-history">
          <div className="admin-right">
            <h3 className="list-food" style={{textAlign: "center"}}>DANH SÁCH MÓN ĂN</h3>
            <div className="add-dish">
              <a
                className="dialog-btn"
                href="#my-dialog"
                onClick={handleOpenDialog}
              >
                Thêm món ăn
              </a>

            </div>
            <div className="trash-dish">
              <Link to="/admin/trash-food">
                <button className="trash-dish-btn text-decoration-none btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i>({data.deleteCount})</button>
              </Link>
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
                    value={inputData.nameprod}
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
                    {!error ? <p style={{ color: 'red' }}>Chưa có hình ảnh</p> : null}
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
                      value={inputData.price}
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
                      value={inputData.category}
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
                  <p style={{ color: 'red' }}>{errors.category === "Loại".message}</p>

                  <button type="submit" className="btn btn-primary">
                    Thêm món
                  </button>
                </form>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={data.products}
              bordered
            >
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageFood;
