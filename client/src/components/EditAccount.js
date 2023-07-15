import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../styles/EditStaff.scss";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Họ và tên chỉ cho phép các ký tự chữ")
      .required("Không được để trống họ và tên"),

    address: yup.string().required("Không được để trống địa chỉ giao hàng"),

    phonenumber: yup
      .string()
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
function EditAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [account, setAccount] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/account/${_id}`, token)
      .then((response) => {
        const accountData = response.data.account;
        setAccount(accountData);
        setUsername(accountData.username);
        setEmail(accountData.email);
        setPhoneNumber(accountData.phonenumber);
        setAddress(accountData.address);
        setRole(accountData.role);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [_id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const validate = await schema.validate(
        {
          username,
          email,
          phonenumber,
          address,
          role,
        },
        { abortEarly: false }
      );

      const updatedAccount = {
        username: validate.username,
        email: validate.email,
        phonenumber: validate.phonenumber,
        address: validate.address,
        role: validate.role,
      };
      await axios.put(
        `http://localhost:5000/api/admin/update-account/${_id}`,
        updatedAccount,
        token
      );

      message.success("Cập nhật thành công");
      navigate("/admin/manage-account");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = error.errors;
        errorMessages.forEach(message.error);
      } else {
        console.error(error);
        message.error("Cập nhật thất bại");
      }
    }
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="Edit-account">Edit Account</h2>
      <Form onSubmit={handleUpdate}>
        <FormGroup>
          <Label>Tên tài khoản:</Label>
          <Input
            type="text"
            value={username}
            {...register("username")}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label style={{ color: "red" }}>{errors.username?.message}</label>
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            {...register("email")}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label style={{ color: "red" }}>{errors.email?.message}</label>
        </FormGroup>
        <FormGroup>
          <Label>Số điện thoại:</Label>
          <Input
            type="text"
            value={phonenumber}
            {...register("phonenumber")}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <label style={{ color: "red" }}>{errors.phonenumber?.message}</label>
        </FormGroup>
        <FormGroup>
          <Label>Địa chỉ:</Label>
          <Input
            type="text"
            value={address}
            {...register("address")}
            onChange={(event) => setAddress(event.target.value)}
          />
          <label style={{ color: "red" }}>{errors.address?.message}</label>
        </FormGroup>
        <FormGroup>
          <Label>Vị trí:</Label>
          <Input
            type="select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </Input>
        </FormGroup>
        <Button color="primary" type="submit" className="btn-editStaff">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default EditAccount;
