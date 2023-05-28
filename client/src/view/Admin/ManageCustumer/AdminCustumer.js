import React from "react";
import './AdminCustumer.scss';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function AdminCustumer() {
    const [inputData, setInputData] = useState({
        
        FullName: '',
        Phone: '',
        Password: '',
        Email: '',
        dob: '',
        Address: '',
    })
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {

        axios.get('http://localhost:3030/custumers')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
            
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3030/custumers', inputData)
            .then(res => {
                alert("Thêm nhân viênthành công")
                navigate('/manage-custumer')
            })
    }
        return (
            <section className="account-admin-wrapper ">
                <div className="account-admin-content">

                    <div className="nav-info-menu">
                        <div>
                            <div className="left-admin-content">
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
                            <h3>THÔNG TIN KHÁCH HÀNG</h3>
                            <div className="add-dish"> <a className="dialog-btn" href="#my-dialog">Thêm khách hàng</a></div>


                            <div class="dialog overlay" id="my-dialog">
                                <a href="#" class="overlay-close"></a>

                                <div class="dialog-body">
                                    <a class="dialog-close-btn" href="#">&times;</a>
                                    <h3>Thêm khách hàng</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleFormControlInput1" className="text-lable">Họ tên khách hàng</label>
                                            <input type="text" class="form-control" name="FullName" placeholder="họ và tên" 
                                                    onChange={e => setInputData({ ...inputData, FullName: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1" className="text-lable">Số điện thoại</label>
                                            <input type="text" class="form-control" name="Phone" placeholder="số điện thoại" 
                                                 onChange={e => setInputData({ ...inputData, Phone: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect2" className="text-lable">Mật khẩu</label>
                                            <input type="password" class="form-control" name="Password" placeholder="mật khẩu" 
                                                 onChange={e => setInputData({ ...inputData, Password: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Địa chỉ Email</label>
                                            <input type="email" class="form-control" name="Email" placeholder="Email" 
                                                 onChange={e => setInputData({ ...inputData, Email: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Địa chỉ</label>
                                            <input type="text" class="form-control" name="Address" placeholder="Địa chỉ" 
                                                 onChange={e => setInputData({ ...inputData, Address: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Ngày sinh</label>
                                            <input type="date" class="form-control" name="dob" placeholder="dd/mm/yyyy" 
                                                 onChange={e => setInputData({ ...inputData, dob: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                            <table className="admin-table ">
                                <tr>
                                    <th className="admin-header">Mã Khách hàng</th>
                                    <th className="admin-header">Họ tên</th>
                                    <th className="admin-header">Số điện thoại</th>
                                    <th className="admin-header">Mật khẩu</th>
                                    <th className="admin-header">Địa chỉ Email</th>
                                    <th className="admin-header">Địa chỉ</th>
                                    <th className="admin-header">Ngày sinh</th>
                                    <th className="admin-header">Lựa chọn</th>
                                   

                                </tr>
                                {data.map((d, i) => (
                                    <tr key={i}>
                                    <td className="admin-content">{d.id}</td>
                                    <td className="admin-content">{d.FullName}</td>
                                    <td className="admin-content">{d.Phone}</td>
                                    <td className="admin-content">{d.Password}</td>
                                    <td className="admin-content">{d.Email}</td>
                                    <td className="admin-content">{d.Address}</td>
                                    <td className="admin-content">{d.dob}</td>
                                   
                                    <td className="admin-content">
                                    <Link className='text-decoration-none btn btn-sm btn-success' to={`/Edit-custumer/${d.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>

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
                axios.delete('http://localhost:3030/custumers/' + id)
                    .then(res => {
                        alert("  Xóa thành công");
                        
                    })
            }
        }
    }
export default AdminCustumer;
