import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ManageFood.scss";
import Footer from "../view/Footer";
import { message } from "antd";
const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
const token = {
    headers: {
        Authorization: `Bearer ${dataUser?.token}`,
        "Content-Type": "application/json",
    },
};
console.log(token);
function TrashFood() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [deletedProduct, setDeletedProduct] = useState(null);
    const [addedProduct, setAddedProduct] = useState(null);

    const getTrash = async() =>{
      await axios
        .get("http://localhost:5000/api/admin/trash-product", token)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
    useEffect(() => {
        getTrash()
    }, [deletedProduct]);
    

    const handleRestore= async(_id)=> {
     const result = await  axios.patch(`http://localhost:5000/api/admin/restore-product/${_id}`, token)
          .then(() =>{
            if(result){
                alert("Khoi phuc thanh cong");
            }
          })
          .catch(err =>{
            alert("Khoi phuc that bai")
          })     

    }

    function handleForceDelete(_id) {
        const confirm = window.confirm("Bạn có muốn xóa?");
        if (confirm) {
            axios
                .delete(`http://localhost:5000/api/admin/forcedelete-product/${_id}`, token)
                .then((res) => {
                    alert(" Xóa thành công");
                    console.log(_id);
                    setDeletedProduct(_id);
                });
        }
    }

    return (
        <section className="">
            <div className="account-food-content">
                <div className="right-history">
                    <div className="admin-right">
                        <h3 className="list-food">DANH SÁCH MÓN ĂN BỊ XÓA</h3>
                        <Link  to={"/admin/manage-food"}>Tro ve</Link>
                        <table className="food-table">
                            <thead>
                                <tr>
                                    <th className="food-header">Mã Món</th>
                                    <th className="food-header">Tên món</th>
                                    <th className="food-header">Hình ảnh</th>
                                    <th className="food-header">Giá</th>
                                    <th className="food-header">Loại</th>
                                    <th className="food-header">Chỉnh sửa</th>
                                    <th className="food-header">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products?.map((d, i) => (
                                    <tr key={i}>
                                        <td className="food-content">{i + 1}</td>
                                        <td className="food-content">{d.nameprod}</td>
                                        <td className="food-content">
                                            <img
                                                src={d.image}
                                                className="img-manageFood"
                                                alt="food"
                                            />
                                        </td>
                                        <td className="food-content">
                                            {d.price && d.price.toLocaleString()}&#8363;
                                        </td>
                                        <td className="food-content">{d.category}</td>
                                        <td className="food-content">
                                            <button
                                                className="text-decoration-none btn btn-sm btn-success"

                                                onClick={() => handleRestore(d._id)}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                        <td className="food-content">
                                            <button
                                                className="text-decoration-none btn btn-sm btn-danger"
                                                onClick={(e) => handleForceDelete(d._id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>{" "}
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
}

export default TrashFood;
