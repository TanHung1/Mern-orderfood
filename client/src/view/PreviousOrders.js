import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Button } from "antd";
import { NavLink, Link } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
const PreviousOrders = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const accessToken = localStorage.getItem("token");
  const dataUser = JSON.parse(accessToken);
  const userId = dataUser?.user?._id;

  const token = {
    headers: {
      Authorization: `Bearer ${dataUser?.token}`,
      "Content-Type": "application/json",
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (accessToken) {
      setCustomerName(dataUser.user?.username);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/order/${userId}/myorder`,
          token
        );
        console.log(
          "Dữ liệu các đơn hàng đã đặt của người dùng:",
          response.data.orders
        ); // Hiển thị dữ liệu các đơn hàng đã đặt của người dùng

        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [customerId]);
  const printInvoice = (data) => {
    const doc = new jsPDF();

    // Tạo định dạng cho tài liệu PDF
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const marginLeft = 20;
    const marginTop = 20;
    const contentWidth = pageWidth - marginLeft * 2;
    let currentY = marginTop;

    // In các thông tin hóa đơn
    doc.setFontSize(18);
    doc.text("Hóa đơn", marginLeft, currentY);
    currentY += 10;
    doc.setFontSize(12);
    doc.text(
      `Ngày đặt: ${moment(data.createdAt).format("DD/MM/YYYY HH: mm")}`,
      marginLeft,
      currentY
    );
    currentY += 10;
    doc.text(`Tên khách hàng: ${data.username}`, marginLeft, currentY);
    currentY += 10;
    doc.text(`Số điện thoại: ${data.phonenumber}`, marginLeft, currentY);
    currentY += 10;
    doc.text("Chi tiết đơn hàng:", marginLeft, currentY);
    currentY += 10;
    data.product.forEach((p) => {
      doc.text(
        `${p.nameprod}: ${p.price.toLocaleString()}đ`,
        marginLeft,
        currentY
      );
      currentY += 10;
    });
    doc.text(
      `Tổng giá: ${data.totalPrice.toLocaleString()}đ`,
      marginLeft,
      currentY
    );
    currentY += 10;
    doc.text(`Trạng thái: ${data.status}`, marginLeft, currentY);

    // Lưu tài liệu PDF
    doc.save("hoadon.pdf");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
      align: "center",
      render: (_id) => <span>{_id}</span>,
    },
    {
      title: "Thông tin đơn hàng",
      dataIndex: "product",
      width: "40%",
      align: "center",
      render: (product) =>
        product.map((p) => <div key={p._id}>{p.nameprod}</div>),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "10%",
      align: "center",

      render: (text) => <span>{Number(text).toLocaleString()}&#8363;</span>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
      defaultSortOrder: "ascend",
      sorter: (a, b) => moment(b.createdAt).diff(moment(a.createdAt)),
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD-MM-YYYY HH: mm")}</span>
      ),
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
          case "Đã hoàn thành":
            color = "green";
            break;
          case "Chưa xác nhận":
            color = "yellow";
            break;
          case "Đã xác nhận":
            color = "purple";
            break;
          case "Đang giao":
            color = "blue";
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
          <Button onClick={() => printInvoice(record)}>
            <i class="fa-solid fa-print"></i>
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 className="list-order">Danh sách đơn hàng</h2>

      <Table
        style={{ margin: "0px 20px" }}
        columns={columns}
        dataSource={orders}
        bordered
      ></Table>
    </div>
  );
};

export default PreviousOrders;
