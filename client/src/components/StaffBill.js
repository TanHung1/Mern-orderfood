import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tag, Button } from "antd";
import "../styles/EditBill.scss";
import "jspdf-autotable";
import moment from "moment";
import "moment/locale/vi";
import api from "../util/api.js";

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function StaffBill() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const result = async () => {
    const ressponse = await axios
      .get(`${api}/api/staff/all-orders`, token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    return ressponse?.data;
  };
  useEffect(() => {
    result();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <span>{_id}</span>,
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
      defaultSortOrder: "ascend",
      sorter: (a, b) => moment(b.createdAt).diff(moment(a.createdAt)),
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD/MM/YYYY HH: mm")}</span>
      ),
    },
    {
      title: "Tên món",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <>
          {product.map((p) => (
            <div key={p._id}>{p.nameprod}</div>
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
      align: "center",
      key: "status",

      filters: [
        {
          text: "Chưa xác nhận",
          value: "Chưa xác nhận",
        },
        {
          text: "Đã xác nhận",
          value: "Đã xác nhận",
        },
        {
          text: "Đang giao",
          value: "Đang giao",
        },
        {
          text: "Đã hoàn thành",
          value: "Đã hoàn thành",
        },
        {
          text: "Đơn hàng bị hủy",
          value: "Đơn hàng bị hủy",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => {
        let color;
        switch (status) {
          case "Chưa xác nhận":
            color = "yellow";
            break;
          case "Đã hoàn thành":
            color = "green";
            break;
          case "Đang giao":
            color = "blue";
            break;
          case "Đã xác nhận":
            color = "purple";
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
          <Link to={`/Staff/manage-bill/edit/${record._id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Link to={`/Staff/manage-bill/print-bill/${record._id}`}>
            <Button>
              <i class="fa-solid fa-print"></i>
            </Button>
          </Link>
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

export default StaffBill;
