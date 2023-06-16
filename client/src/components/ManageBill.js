import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tag, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/EditBill.scss";
import moment from "moment";
import "moment/locale/vi";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};


function ManageBill() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/get-all-orders", token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:5000/api/admin/${_id}/delete-order`, token)
      .then((res) => {
        message.success("Xóa đơn hàng thành công!");
        setData(data.filter((d) => d._id !== _id));
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "_id",
      render: (_id, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Người đặt",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH: mm"),
    },
    {
      title: "Tên món",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <>
          {product.map((p) => (
            <div key={p._id}>- {p.nameprod}</div>
          ))}
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => <span>{`${totalPrice.toLocaleString()}₫`}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Chưa xác nhận":
            color = "orange";
            break;
          case "Đã xác nhận":
            color = "purple";
            break;
          case "Đang giao":
            color = "blue";
            break;
          case "Đã hoàn thành giao đơn hàng":
            color = "green";
            break;
          case "Đơn hàng bị hủy":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Lựa chọn",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/Admin/manage-bill/edit/${record._id}`}>
            <EditOutlined /> Sửa
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xóa đơn hàng này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
          ></Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="managebill">Danh sách các hóa đơn</h2>
      <Table columns={columns} dataSource={data.orders} rowKey="_id" />
    </div>
  );
}

export default ManageBill;
