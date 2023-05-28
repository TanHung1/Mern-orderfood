import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function ManageBill()  {
    const [inputData, setInputData] = useState({
        
        NameCustumer: '',
        BookingDate: '',
        DeliveryDate: '',
        Place: '',
        Payment: '',
        TotalMoney: '',
        Status: ''
    })
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {

        axios.get('http://localhost:3030/bills')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3030/bills', inputData)
            .then(res => {
                alert("Thêm hóa đơn thành công")
                navigate('/Staff/manage-bill')
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
                               
                                    <li> <Link to={"/Staff/manage-bill"} className="link">Quản ký Hóa đơn</Link></li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="right-history">
                        <div className="admin-right ">
                            <h3>THÔNG TIN Hóa Đơn</h3>
                            <div className="add-dish"> <a className="dialog-btn" href="#my-dialog">Thêm hóa đơn</a></div>


                            <div class="dialog overlay" id="my-dialog">
                                <a href="#" class="overlay-close"></a>

                                <div class="dialog-body">
                                
                                    <a class="dialog-close-btn" href="#">&times;</a>
                                    <h3>Thêm hóa đơn</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-group" >
                                            <label for="exampleFormControlInput1" className="text-lable">Họ tên khách hàng</label>
                                            <input type="text" class="form-control" name="NameCustumer" placeholder="nhập số họ tên" id="exampleFormControlFile1" 
                                                onChange={e => setInputData({ ...inputData, NameCustumer: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1" className="text-lable">Ngày đặt</label>
                                            <input type="date" class="form-control" name="BookingDate" placeholder="dd/mm/yyyy" id="exampleFormControlFile1" 
                                                onChange={e => setInputData({ ...inputData, BookingDate: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect2" className="text-lable">Ngày giao</label>
                                            <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="dd/mm/yyyy" name="DeliveryDate"
                                                 onChange={e => setInputData({ ...inputData, DeliveryDate: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Nơi giao</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nhập nơi giao" name="Place"
                                                 onChange={e => setInputData({ ...inputData, Place: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Hình thức thanh toán</label>
                                            <select class="form-control" onChange={e => setInputData({...inputData, Payment: e.target.value})}>
                                                <option >Lựa chọn</option>
                                                <option>Tiền mặt</option>
                                                <option>Chuyển khoản</option>

                                            </select>

                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Tổng tiền</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nhập tổng tiền" name="TotalMoney" 
                                                onChange={e => setInputData({ ...inputData, TotalMoney: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="text-lable">Trang thái</label>
                                            <select class="form-control" onChange={e => setInputData({...inputData, Status: e.target.value})}>
                                                <option >Lựa chọn</option>
                                                <option>Đang giao</option>
                                                <option>Đã giao</option>

                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                            <table className="admin-table ">
                                <tr>
                                    <th className="admin-header">Mã Đơn</th>
                                    <th className="admin-header">Khách hàng</th>
                                    <th className="admin-header">Ngày đặt</th>
                                    <th className="admin-header">ngày giao</th>
                                    <th className="admin-header">Nơi giao</th>
                                    <th className="admin-header">Hình thức thanh toán</th>
                                    <th className="admin-header">Tổng tiền</th>
                                    <th className="admin-header">Trang thái</th>
                                    <th className="admin-header">Lựa chọn</th>

                                </tr>
                                {data.map((d, i) => (
                                    <tr key={i}>
                                    <td className="admin-content">{d.id}</td>
                                    <td className="admin-content">{d.NameCustumer}</td>
                                    <td className="admin-content">{d.BookingDate}</td>
                                    <td className="admin-content">{d.DeliveryDate}</td>
                                    <td className="admin-content">{d.Place}</td>
                                    <td className="admin-content">{d.Payment}</td>
                                    <td className="admin-content">{d.TotalMoney}</td>
                                    <td className="admin-content">{d.Status}</td>
                                    <td className="admin-content">
                                    <Link className='text-decoration-none btn btn-sm btn-success' to={`/manage-bill/edit/${d.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>

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
                axios.delete('http://localhost:3030/bills/' + id)
                    .then(res => {
                        alert(" Xóa thành công");
                        
                    })
            }
        }
    }

export default ManageBill;