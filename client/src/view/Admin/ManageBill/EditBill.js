import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
function EditBill()  { 
    const { id } = useParams();
    const [inputData, setInputData] = useState({
        id: id,
        NameCustumer: '',
        BookingDate: '',
        DeliveryDate: '',
        Place: '',
        Payment: '',
        TotalMoney: '',
        Status: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/bills/' + id)
            .then(res => setInputData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3030/bills/' + id, inputData)
            .then(res => {
                alert("cap nhat thanh cong")
                navigate('/Staff/manage-bill')
            })
    }
        return (
            <section className="account-admin-wrapper ">
                <div className="account-food-content">

                    <div className="nav-info-menu">
                        <div>
                            <div className="left-food-content">
                                <div className="header-info">
                                    <h2>XIN CHÀO,<br /> HƯNG</h2>
                                    <p><a href="">Đăng xuất</a></p>
                                </div>
                                <ul >
                                    <li><a href="/manage-staff" className="link">Quản ký Hóa đơn</a></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right-history">
                        <div className="admin-right ">
                            <h3>CẬP NHẬT MÓN ĂN</h3>
                            <Link to={"/staff/manage-bill"} className="link">Trở về</Link>
                           
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                 <label htmlFor="name">Mã đơn hàng:</label>
                        <input type="number" name='id' className='form-control' value={inputData.id}
                                         />
                             </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Khách hàng</label>
                                    <input type="text" class="form-control" id="exampleFormControlFile1" name="NameCustumer"
                                          value={inputData.NameCustumer}
                            onChange={e => setInputData({ ...inputData, NameCustumer: e.target.value })} />
                                    
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect2">Ngày đặt</label>
                                    <input type="date" class="form-control" id="exampleFormControlFile1" 
                                        name="BookingDate"
                                          value={inputData.BookingDate}
                            onChange={e => setInputData({ ...inputData, BookingDate: e.target.value })} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect2">Ngày giao</label>
                                    <input type="date" class="form-control" id="exampleFormControlFile1" 
                                         name="DeliveryDate"
                                          value={inputData.DeliveryDate}
                            onChange={e => setInputData({ ...inputData, DeliveryDate: e.target.value })} />
                                    
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Nơi giao</label>
                                    <input type="text" class="form-control" id="exampleFormControlFile1" 
                                         name="Place"
                                          value={inputData.Place}
                            onChange={e => setInputData({ ...inputData, Place: e.target.value })} />
                                </div>

                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Hình thức thanh toán</label>
                                    <select class="form-control" onChange={e => setInputData({...inputData, Payment: e.target.value})}>
                                        <option >Lựa chọn</option>
                                        <option>Tiền mặt</option>
                                        <option>Chuyển khoản</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Tổng tiền</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="giá tiền" 
                                          name="TotalMoney"
                                          value={inputData.TotalMoney}
                            onChange={e => setInputData({ ...inputData, TotalMoney: e.target.value })} />
                                    
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Trang thái</label>
                                    <select class="form-control" onChange={e => setInputData({...inputData, Status: e.target.value})}>
                                        <option >Lựa chọn</option>
                                        <option>Đang giao</option>
                                        <option>Đã giao</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Cập nhật</button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
export default EditBill;