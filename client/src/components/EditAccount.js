import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../styles/EditStaff.scss";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};
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
      .get(`http://localhost:5000/api/admin/account/${_id}`, token)
      .then((response) => {
        const accountData = response.data;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedAccount = {
      username,
      email,
      phonenumber,
      address,
      role,
    };
    axios
      .put(
        `http://localhost:5000/api/admin/${_id}/update-account`,
        updatedAccount
      )
      .then((response) => {
        console.log(response.data);
        alert("ok");
        navigate("/manage-staff");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="Edit-account">Edit Account</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username:</Label>
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
          <Label>Phone Number:</Label>
          <Input
            type="text"
            value={phonenumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Role:</Label>
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
