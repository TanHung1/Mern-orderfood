import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/ManageAccount.scss";

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function ManageAccount() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/all-accounts", token)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = (_id) => {
    console.log(_id);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Link to={`/admin/Edit-account/${record._id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <h1 className="h1_listAccount">Danh sách tài khoản</h1>
      <Table dataSource={customers} columns={columns} />
    </div>
  );
}

export default ManageAccount;