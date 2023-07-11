import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/EditBill.scss";
import moment from "moment";
import "moment/locale/vi";
import { Line, Column } from "@ant-design/charts";

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
  const [selectedOption, setSelectedOption] = useState("daily");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/get-all-orders", token)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Thống kê theo ngày
  const completedOrders =
    data.orders?.filter((order) => order.status === "Đã hoàn thành") || [];

  const chartData = completedOrders?.reduce((result, order) => {
    const date = moment(order.createdAt).format("DD/MM/YYYY ");
    const existingData = result.find((data) => data.date === date);

    if (existingData) {
      existingData.totalPrice += order.totalPrice;
    } else {
      result.push({
        date: date,
        totalPrice: order.totalPrice,
      });
    }

    return result;
  }, []);
  const dailyOrders = completedOrders.filter((order) => {
    const today = moment().startOf("day");
    const orderDate = moment(order.createdAt);
    return orderDate.isSame(today, "day");
  });
  const dailyChartData = dailyOrders.reduce((result, order) => {
    const date = moment(order.createdAt).format("DD/MM/YYYY hh:mm");
    const existingData = result.find((data) => data.date === date);

    if (existingData) {
      existingData.totalPrice += order.totalPrice;
    } else {
      result.push({
        date: date,
        totalPrice: order.totalPrice,
      });
    }

    return result;
  }, []);
  // Tính tổng tiền theo ngày
  const dailyTotalPrice = dailyChartData?.reduce((total, data) => {
    return total + data.totalPrice;
  }, 0);

  // Thống kê theo tháng
  const monthlyChartData = completedOrders?.reduce((result, order) => {
    const month = moment(order.createdAt).format("MM/YYYY");
    const existingData = result.find((data) => data.month === month);

    if (existingData) {
      existingData.totalPrice += order.totalPrice;
    } else {
      result.push({
        month: month,
        totalPrice: order.totalPrice,
      });
    }

    return result;
  }, []);
  // Tính tổng tiền theo tháng
  const monthlyTotalPrice = monthlyChartData?.reduce((total, data) => {
    return total + data.totalPrice;
  }, 0);

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

  const dailyChartConfig = {
    data: dailyChartData,
    height: 400,
    xField: "date",
    yField: "totalPrice",
    point: {
      size: 5,
      shape: "diamond",
    },
    xAxis: {
      label: {
        formatter: (value) => moment(value).format("DD/MM/YYYY HH:mm"),
      },
    },
  };
  const monthlyChartConfig = {
    data: monthlyChartData,
    height: 400,
    xField: "month",
    yField: "totalPrice",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container mt-4">
      <h2 className="managebill">Thống kê doanh thu</h2>
      <div>
        <label htmlFor="chartOption">Chọn biểu đồ:</label>
        <select
          id="chartOption"
          value={selectedOption}
          onChange={handleChangeOption}
        >
          <option value="daily">Thống kê trong ngày</option>
          <option value="monthly">Thống kê theo tháng</option>{" "}
          <option value="overall">Thống kê theo từng ngày</option>
        </select>
      </div>
      {selectedOption === "daily" && (
        <>
          <h3>Biểu đồ thống kê trong ngày</h3>
          <Line {...dailyChartConfig} />
          <div className="total-amount">
            Tổng tiền theo ngày: {dailyTotalPrice} đ
          </div>
        </>
      )}
      {selectedOption === "monthly" && (
        <>
          <h3>Biểu đồ thống kê theo tháng</h3>
          <Line {...monthlyChartConfig} />
          <div className="total-amount">
            Tổng tiền theo tháng: {monthlyTotalPrice} đ
          </div>
        </>
      )}
      {selectedOption === "overall" && (
        <>
          <h3>Thống kê theo từng ngày</h3>
          <Line {...chartConfig} />
          <div className="total-amount">
            Tổng tiền tổng cộng:{" "}
            {chartData?.reduce((total, data) => total + data.totalPrice, 0)} đ
          </div>
        </>
      )}
    </div>
  );
}

export default ThongKe;
