import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/ManageStaff.scss";
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
  return (
    <div>
      <h1 className="h1_listAccount">Danh sách tài khoản</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>{customer.phonenumber}</td>
              <td>{customer.address}</td>
              <td>{customer.role}</td>
              <td>
                <Link to={`/admin/Edit-account/${customer._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageAccount;
