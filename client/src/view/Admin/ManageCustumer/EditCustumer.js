import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditCustumer()  {
    const { id } = useParams();

    const [inputData, setInputData] = useState({
        id: id,
        FullName: '',
        Phone: '',
        Password: '',
        Email: '',
        dob: '',
        Address: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/custumers/' + id)
            .then(res => setInputData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3030/custumers/' + id, inputData)
            .then(res => {
                alert("cap nhat thanh cong")
                navigate('/manage-custumer')
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
                            <h3>CẬP NHẬT THÔNG TIN KHÁCH HÀNG</h3>
                            <Link to={"/manage-custumer"} className="link">Trở về</Link>
                            
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Mã khách hàng</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" 
                                    value={inputData.id}
                                    
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Tên khách hàng</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Tên khách hàng" name="FullName"
                                    value={inputData.FullName}
                                    onChange={e => setInputData({ ...inputData, FullName: e.target.value })} 
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Số điện thoại</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Số điện thoại" name="Phone"
                                        value={inputData.Phone}
                                    onChange={e => setInputData({ ...inputData, Phone: e.target.value })} 
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect2" className="lb-edit-staff">Mật khẩu</label>
                                    <input type="password" class="form-control" name= "Password" placeholder="nhập vào mật khẩu"  value={inputData.Password}
                                    onChange={e => setInputData({...inputData, Password: e.target.value})}

                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="lb-edit-staff">Địa chỉ Email</label>
                                    <input type="email" class="form-control" name="Email" placeholder="nhập vào email" value={inputData.Email}
                                    onChange={e => setInputData({...inputData, Email: e.target.value})}
                                     />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="lb-edit-staff">Địa chỉ</label>
                                    <input type="text" class="form-control" name="Address" placeholder="nhập vào email" value={inputData.Address}
                                    onChange={e => setInputData({...inputData, Address: e.target.value})}
                                     />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="lb-edit-staff">Ngày sinh</label>
                                    <input type="date" class="form-control" name="dob" placeholder="nhập vào ngày sinh" value={inputData.dob}
                                    onChange={e => setInputData({...inputData, dob: e.target.value})}
                                     />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
export default EditCustumer;