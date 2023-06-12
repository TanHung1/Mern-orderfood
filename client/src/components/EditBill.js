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
  console.log(order)
  const [status, setStatus] = useState("");

  // Set your access token here

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/staff/${id}/order-detail`, token)
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
      .put(
        `http://localhost:5000/api/staff/update-status-order/${id}`,
        { status },
        token
      )
      .then((res) => {
        alert("Cập nhật trạng thái đơn hàng thành công!");
        navigate(`/Staff/manage-bill`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Chỉnh Sửa Trạng Thái Đơn Hàng</h3>
      <div>
        <p>ID đơn hàng: {order?.order?._id}</p>
        <p>Người đặt: {order?.order?.username}</p>
        <p>
          Tên món:{" "}
          {order?.order?.product.map((p) => p.nameprod).join(", ")}
        </p>
        <p>
          Tổng giá: {order?.order?.totalPrice && order?.order?.totalPrice.toLocaleString()}
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
            <option defaultValue="">{order?.order?.status}</option>
            <option value="Đang chuẩn bị món">Đang chuẩn bị món</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã hoàn thành giao đơn hàng">Đã hoàn thành giao đơn hàng</option>
            <option value="Đơn hàng bị hủy">Đơn hàng bị hủy</option>
          </select>
        </div>
        <button type="submit">Cập nhật trạng thái</button>
      </form>
    </div>
  );
}

export default EditBill;
