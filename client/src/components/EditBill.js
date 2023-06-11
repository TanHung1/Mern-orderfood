import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
        "Content-Type": "application/json",
  }
}
function EditBill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");

  // Set your access token here
  const accessToken = "YOUR_ACCESS_TOKEN_HERE";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/order/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setOrder(res.data);
        setStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:5000/api/admin/update-status-order/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert("Cập nhật trạng thái đơn hàng thành công!");
        navigate("/manage-bill");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Chỉnh Sửa Trạng Thái Đơn Hàng</h3>
      <div>
        <p>ID đơn hàng: {order._id}</p>
        <p>Người đặt: {order.username}</p>
        <p>
          Tên món:{" "}
          {order.product && order.product.map((p) => p.nameprod).join(", ")}
        </p>
        <p>
          Tổng giá: {order.totalPrice && order.totalPrice.toLocaleString()}
          &#8363;
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="status">Trạng Thái:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Đã đặt hàng">Đã đặt hàng</option>
            <option value="Đang giao hàng">Đang giao hàng</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
          </select>
        </div>
        <button type="submit">Cập nhật trạng thái</button>
      </form>
    </div>
  );
}

export default EditBill;
