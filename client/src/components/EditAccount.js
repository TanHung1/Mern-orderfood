import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../styles/EditStaff.scss";
import { message } from "antd";
import * as yup from "yup";
import api from "../util/api.js";

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

    // address: yup.string().required("Không được để trống địa chỉ giao hàng"),

    phonenumber: yup
      .string()
      .required("Không được để trống số điện thoại")
      .typeError("Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại phải đủ 10 chữ số")
      .max(10, "Số điện thoại phải đủ 10 chữ số"),

    email: yup
      .string()
      .required("Không được để trống email")
      .email("Định dạng email không hợp lệ"),
  })
  .required();
function EditAccount() {
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
      .get(`${api}/api/admin/account/${_id}`, token)
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
        `${api}/api/admin/update-account/${_id}`,
        updatedAccount,
        token
      );

      message.success("Cập nhật thành công");
      navigate("/admin/manage-account");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = error.errors;
        message.error(errorMessages.join(", "));
      } else {
        console.error(error);
        message.error(error.response?.data.error);
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
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Số điện thoại:</Label>
          <Input
            type="text"
            value={phonenumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Địa chỉ:</Label>
          <Input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
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
