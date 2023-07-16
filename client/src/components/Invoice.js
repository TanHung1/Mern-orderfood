import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Invoice.scss";
import dayjs from "dayjs";
import moment from "moment";
import { Table, Button } from "antd";
import { useReactToPrint } from "react-to-print";

function Invoice() {
  const [order, setOrder] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(dayjs());
  const { _id } = useParams();
  const componentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const dataUser = JSON.parse(accessToken);
    const token = {
      headers: {
        Authorization: `Bearer ${dataUser?.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(`http://localhost:5000/api/admin/order/${_id}`, token)
      .then((res) => {
        setOrder(res.data.order);
        setId(res.data.order._id);
        setUsername(res.data.order.username);
        setPhoneNumber(res.data.order.phonenumber);
        setAddress(res.data.order.address);
        setTotalPrice(res.data.order.totalPrice);
        setStatus(res.data.order.status);
        setCreatedAt(res.data.order.createdAt);
      })
      .catch((err) => console.log(err));
  }, [_id]);
  console.log(order.product);
  const columns = [
    {
      title: "Tên món",
      dataIndex: "nameprod",
      key: "nameprod",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()} đ</span>,
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <span>{(record.quantity * record.price).toLocaleString()} đ</span>
      ),
    },
  ];
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div class="bill">
        <Link to={"/Admin/manage-bill"}>Trở về</Link>
        <div class="bill-details" ref={componentRef}>
          <div class="bill-section">
            <div class="summary-item">
              <p>Mã đơn hàng:</p>
              <p>{id}</p>
            </div>
            <div class="summary-item">
              <p>Đơn hàng được tạo:</p>
              <p>{moment(createdAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
          </div>
          <div class="bill-section">
            <h2>Thông tin nhận hàng</h2>
            <div class="summary-item">
              <p>Tên người nhận:</p>
              <p>{username}</p>
            </div>
            <div class="summary-item">
              <p>SĐT người nhận:</p>
              <p>{phonenumber}</p>
            </div>
            <div class="summary-item">
              <p>Địa chỉ người nhận:</p>
              <p>{address}</p>
            </div>
          </div>
          <div class="bill-section">
            <h2>Danh sách sản phẩm</h2>
            <Table
              columns={columns}
              dataSource={order.product}
              rowKey="_id"
              pagination={false}
            />
          </div>
          <div class="bill-summary">
            <h2>Tiền thu người nhận</h2>
            <div class="summary-item">
              <p>Tổng giá đơn hàng:</p>
              <p>{totalPrice.toLocaleString()} đ</p>
            </div>
          </div>
        </div>

        <Button onClick={handlePrint}>
          <i class="fa-solid fa-print"></i>
        </Button>
        <style>{`
      @media print {
        body {
          margin: 0;
          padding: 0;
          background-color: #fff;
        }
        .bill {
          width: 100%;
          height: 50%;
        }
        .bill-details {
          padding: 20px;
          width: 100%;
          height: 100%;
        }
      }
    `}</style>
      </div>
    </>
  );
}

export default Invoice;
