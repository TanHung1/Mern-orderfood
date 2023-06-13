import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { message } from "antd";
import "../styles/EditBill.scss";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};
function EditBill() {
  const [order, setOrder] = useState(null);
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/order/${_id}`, token)
      .then((res) => {
        const orderData = res.data;
        setOrder(orderData);
        setUsername(orderData.username);
        setPhoneNumber(orderData.phonenumber);
        setAddress(orderData.address);
        setTotalPrice(orderData.totalPrice);
        setStatus(orderData.status);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = {
      username,
      phonenumber,
      address,
      totalPrice,
      status,
    };
    axios
      .put(
        `http://localhost:5000/api/admin/${_id}/update-order`,
        updatedOrder,
        token
      )
      .then((res) => {
        console.log(res.data);
        message.success("Cập nhật thông tin đơn hàng thành công!");
        navigate("/Staff/manage-bill");
      })
      .catch((err) => console.log(err));
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="Edit-order">Cập nhật thông tin đơn hàng</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Tên khách hàng:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Số điện thoại:</Label>
          <Input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Địa chỉ:</Label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tổng giá:</Label>
          <Input
            type="text"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Trạng thái:</Label>
          <Input
            type="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Chưa xác nhận">Chưa xác nhận</option>
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã giao">Đã giao</option>
          </Input>
        </FormGroup>
        <Button color="primary" type="submit" className="btn-editOrder">
          Lưu
        </Button>
      </Form>
    </div>
  );
}

export default EditBill;
