import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
        "Content-Type": "application/json",
  }
}
function ManageBill() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Set your access token here

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/allorders", token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    console.log(data);
  }, []); // add empty dependency array to run only once
  function handleDelete(_id) {
    const confirm = window.confirm("Bạn có muốn xóa?");
    if (confirm) {
      axios
        .delete(`http://localhost:5000/api/admin/${_id}/delete-order/`, token)
        .then((res) => {
          alert(" Xóa thành công");
        });
    }
  }

  return (
    <section className=" ">
      <div className="">
        <div className="">
          <div className="">
            <h3>Thông Tin Hóa Đơn</h3>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Người đặt</th>
                  <th scope="col">Ngày đặt</th>
                  <th scope="col">Tên món</th>

                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Tổng giá</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                {data.orders?.map((d, i) => (
                  <tr key={i}>
                    <td className="admin-content">{i + 1}</td>
                    <td className="admin-content">{d.username}</td>
                    <td className="admin-content">{d.createdAt}</td>
                    <td className="admin-content">
                      {d.product.map((p) => (
                        <div key={p._id}>- {p.nameprod}</div>
                      ))}
                    </td>

                    <td className="admin-content">{d.phonenumber}</td>

                    <td className="admin-content">
                      {d.totalPrice.toLocaleString()}&#8363;
                    </td>
                    <td className="admin-content">{d.status}</td>
                    <td className="admin-content">
                      <Link
                        className="text-decoration-none btn btn-sm btn-success"
                        to={`/manage-bill/edit/${d._id}`}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Link>

                      <button
                        className="text-decoration-none btn btn-sm btn-danger"
                        onClick={(e) => handleDelete(d._id)}
                      >
                        <i class="fa-solid fa-trash"></i>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
  function handleDelete(id) {
    const confirm = window.confirm("Bạn có muốn xóa?");
    if (confirm) {
      axios.delete("http://localhost:3030/bills/" + id).then((res) => {
        alert(" Xóa thành công");
      });
    }
  }
}

export default ManageBill;
