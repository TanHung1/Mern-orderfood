import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import {EditOutlined} from "@ant-design/icons"
import "../styles/ManageAccount.scss";
import api from "../util/api.js";

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

function ManageAccount() {
  const [accounts, setaccounts] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/api/admin/all-accounts`, token)
      .then((response) => {
        setaccounts(response.data.accounts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record, index) => <span>{_id}</span>,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Lựa chọn",
      key: "actions",
      render: (text, record) => (
        <Link to={`/admin/Edit-account/${record._id}`}>
          <Button type="primary"><EditOutlined /></Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <h1 className="h1_listAccount">Danh sách tài khoản</h1>
      <Table style={{margin: "0 px 20px"}} dataSource={accounts} columns={columns} />
    </div>
  );
}

export default ManageAccount;
