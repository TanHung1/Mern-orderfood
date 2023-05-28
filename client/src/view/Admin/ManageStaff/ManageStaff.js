import React from "react";
import './ManageStaff.scss';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function ManageStaff() {
    const [inputData, setInputData] = useState({
        
        FullName: '',
        Phone: '',
        Password: '',
        Email: '',
        Role: ''
    })
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {

        axios.get('http://localhost:3030/staffs')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3030/staffs', inputData)
            .then(res => {
                alert("Thêm nhân viênthành công")
                navigate('/manage-staff')
            })
    }
        return (
            <section className="account-admin-wrapper ">
                <div className="account-staff-content">

                    <div className="nav-info-menu">
                        <div>
                            <div className="left-staff-content">
                                <div className="header-info">
                                    <h2>XIN CHÀO,<br /> HƯNG</h2>
                                    <p><a href="">Đăng xuất</a></p>
                                </div>
                                <ul >
                                    <li><Link to={"/manage-food"} className="link">Quản lý thức ăn</Link></li>
                                    <li><Link to={"/manage-custumer"} className="link">Quản lý khách hàng</Link></li>
                                    <li><Link to={"/manage-staff"} className="link">Quản ký nhân viên</Link></li>
                                    <li><Link to={"/my-account/previous-orders"} className="link">Thống kê</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="right-history">
                        <div className="admin-right ">
                            <h3>THÔNG TIN NHÂN VIÊN</h3>
                            <div className="add-dish"> <a className="dialog-btn" href="#add-staff">Thêm nhân viên</a></div>


                            <div class="dialog overlay" id="add-staff">
                                <a href="#" class="overlay-close"></a>

                                <div class="dialog-body">
                                    <a class="dialog-close-btn" href="#">&times;</a>
                                    <h3>Thêm nhân viên</h3>
                                    <form onSubmit={handleSubmit}>
                                    <div class="form-group">
                                            <label for="exampleFormControlFile1" className="text-lable">Họ tên</label>
                                            <input type="text" class="form-control" name="Fullname" placeholder="nhập số họ tên" id="exampleFormControlFile1" 
                                                onChange={e => setInputData({ ...inputData, FullName: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1" className="text-lable">Số điện thoại</label>
                                            <input type="text" class="form-control" name="Phone" placeholder="nhập số điện thoại" id="exampleFormControlFile1" 
                                                onChange={e => setInputData({ ...inputData, Phone: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect2" className="text-lable">Mật khẩu</label>
                                            <input type="password" class="form-control" name="Password" placeholder="nhập mật khẩu" id="exampleFormControlFile1" 
                                                onChange={e => setInputData({ ...inputData, Password: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Địa chỉ Email</label>
                                            <input type="email" class="form-control" name="Email" placeholder="nhập Email" id="exampleFormControlFile1" 
                                                onChange={e => setInputData({ ...inputData, Email: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Chức vụ</label>
                                            <select class="form-control" onChange={e => setInputData({...inputData, Role: e.target.value})}>
                                                <option >Chức vụ</option>
                                                <option>Thu ngân</option>
                                                <option>Shipper</option>

                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                                   
                                </div>
                            </div>
                            <table className="staff-table">
                                <tr>
                                    <th className="staff-header">Mã Nhân viên</th>
                                    <th className="staff-header">Họ tên</th>
                                    <th className="staff-header">Số điện thoại</th>
                                    <th className="staff-header">Mật khẩu</th>
                                    <th className="staff-header">Địa chỉ Email</th>
                                    <th className="staff-header">Chức vụ</th>
                                    <th className="staff-header">Lựa chọn</th>
                                    
                                </tr>
                                    {data.map((d, i) => (
                                    <tr key={i}>
                                    <td className="staff-content">{d.id}</td>
                                    <td className="staff-content">{d.FullName}</td>
                                    <td className="staff-content">{d.Phone}</td>
                                    <td className="staff-content">{d.Password}</td>
                                    <td className="staff-content">{d.Email}</td>
                                    <td className="staff-content">{d.Role}</td>
                                    <td className="staff-content">
                                    <Link className='text-decoration-none btn btn-sm btn-success' to={`/Edit-staff/${d.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                                    <button className='text-decoration-none btn btn-sm btn-danger' onClick={e => handleDelete(d.id)}><i class="fa-solid fa-trash"></i> </button>
                                    </td>
                                    
                                </tr>
                           
                                    ))}
                                

                            </table>
                        </div>
                    </div>
                </div>
            </section>
        )
        function handleDelete(id) {
            const confirm = window.confirm("Bạn có muốn xóa?");
            if (confirm) {
                axios.delete('http://localhost:3030/staffs/' + id)
                    .then(res => {
                        alert(" Xóa thành công");
                        
                    })
            }
        }
    }
    

export default ManageStaff;