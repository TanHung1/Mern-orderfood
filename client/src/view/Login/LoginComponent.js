import React, { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/login",
        { email, password }
      );
      console.log(email, password);
      localStorage.setItem("token", JSON.stringify(response.data));

      window.location.href = "/";
      console.log(response);
      alert("thanh cong", localStorage);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
      }
    }
  };
  const isFormValid = email && password;
  return (
    <div>
      <h1>Đăng nhập</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Tên đăng nhập:</label>
        <input type="text" value={email} onChange={handleEmailChange} />
        <label>Mật khẩu:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit" disabled={!isFormValid}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
