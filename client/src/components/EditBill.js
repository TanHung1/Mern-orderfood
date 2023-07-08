import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { message } from "antd";
import "../styles/EditBill.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Họ và tên chỉ cho phép các ký tự chữ")
      .required("Không được để trống họ và tên"),

    address: yup.string().required("Không được để trống địa chỉ giao hàng"),

    phonenumber: yup
      .number()
      .required("Không được để trống số điện thoại")
      .typeError("Số điện thoại không hợp lệ")
      .min(1000000000, "Số điện thoại phải đủ 10 chữ số")
      .max(9999999999, "Số điện thoại phải đủ 10 chữ số"),

    email: yup
      .string()
      .email("Định dạng email không hợp lệ")
      .required("Không được để trống email"),
  })
  .required();

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function EditBill() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
        setOrder(res.data);
        setUsername(res.data.username);
        setPhoneNumber(res.data.phonenumber);
        setAddress(res.data.address);
        setTotalPrice(res.data.totalPrice);
        setStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  const handleUpdate = (e) => {
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
        `http://localhost:5000/api/admin/update-order/${_id}`,
        updatedOrder,
        token
      )
      .then((res) => {
        console.log(res.data);
        message.success("Cập nhật thông tin đơn hàng thành công!");
        // navigate("/Staff/manage-bill");
      })
      .catch((err) => console.log(err));
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="Edit-order">Cập nhật thông tin đơn hàng</h2>
      <Form onSubmit={handleUpdate}>
        <FormGroup>
          <Label>Tên khách hàng:</Label>
          <Input
            type="text"
            disabled
            value={username}
            {...register("username")}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label style={{ color: "red" }}>{errors.username?.message}</label>
        </FormGroup>
        <FormGroup>
          <Label>Số điện thoại:</Label>
          <Input
            type="text"
            disabled
            value={phonenumber}
            {...register("phonenumber")}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label style={{ color: "red" }}>{errors.phonenumber?.message}</label>
        </FormGroup>
        <FormGroup>
          <Label>Địa chỉ:</Label>
          <Input
            type="text"
            value={address}
            disabled
            {...register("address")}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label style={{ color: "red" }}>{errors.address?.message}</label>
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
            <option value="Đã hoàn thành">
             Đã hoàn thành
            </option>
            <option value="Đơn hàng bị hủy">Đơn hàng bị hủy</option>
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
