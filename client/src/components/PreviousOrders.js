import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag } from "antd";
import { NavLink, Link } from "react-router-dom";

const { Column } = Table;

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

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <Link to={"/my-account/edit"} style={{ width: "100%" }}>
        Trở về
      </Link>
      <Table dataSource={orders} rowKey="_id">
        <Column title="Mã đơn hàng" dataIndex="_id" key="_id" />
        <Column
          title="Thông tin đơn hàng"
          dataIndex="product"
          render={(product) =>
            product.map((p) => <div key={p._id}>- {p.nameprod}</div>)
          }
        />
        <Column title="Tổng tiền" dataIndex="totalPrice" key="totalPrice" />
        <Column title="Địa chỉ" dataIndex="address" key="address" />
        <Column title="Ngày đặt hàng" dataIndex="createdAt" key="createdAt" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="status"
          render={(status) => {
            let color;
            switch (status) {
              case "Chưa xác nhận":
                color = "orange";
                break;
              case "Đã xác nhận":
                color = "green";
                break;
              case "Đang giao":
                color = "blue";
                break;
              case "Đã giao":
                color = "purple";
                break;
              default:
                color = "gray";
            }
            return <Tag color={color}>{status}</Tag>;
          }}
        />
      </Table>
    </div>
  );
};

export default PreviousOrders;
