import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/EditBill.scss";
import moment from "moment";
import "moment/locale/vi";
import { Line } from "@ant-design/charts";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function ThongKe() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect((res) => {
    axios
      .get("http://localhost:5000/api/admin/get-all-orders", token)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const completedOrders = data.orders?.filter(
    (order) => order.status === "Đã hoàn thành"
  );
  console.log("completedOrders:", completedOrders);
  const chartData =
    completedOrders?.map((order) => ({
      date: moment(order.createdAt).format("DD/MM/YYYY"),
      totalPrice: order.totalPrice,
    })) || [];
  console.log("du lieu:", chartData);

  const chartConfig = {
    data: chartData,
    height: 400,
    xField: "date",
    yField: "totalPrice",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  return (
    <div className="container mt-4">
      <h2 className="managebill">Thống kê doanh thu</h2>
      <Line {...chartConfig} />
    </div>
  );
}
export default ThongKe;
