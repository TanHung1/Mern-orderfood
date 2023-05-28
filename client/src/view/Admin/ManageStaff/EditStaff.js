import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './EditStaff.scss';
function EditStaff() {

    const { id } = useParams();
    const [inputData, setInputData] = useState({
        id: id,
        FullName: '',
        Phone: '',
        Password: '',
        Email: '',
        Role: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/staffs/' + id)
            .then(res => setInputData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3030/staffs/' + id, inputData)
            .then(res => {
                alert("cap nhat thanh cong")
                navigate('/manage-staff')
             console.log("check>>", res);   
        }).catch(err => console.log(err))
            
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
                            <h3>CẬP NHẬT Nhân viên</h3>
                            <Link to={"/manage-staff"} className="link">Trở về</Link>
                          
                        
                            <form onSubmit={handleSubmit}>
                            <div class="form-group">
                        <label htmlFor="name">Mã Nhân viên:</label>
                        <input type="number" name='id' className='form-control' value={inputData.id}
                        />
                    </div>
                                <div class="form-group">

                                    <label for="exampleFormControlInput1" className="lb-edit-staff">Họ tên nhân viên</label>
                                    <input type="text" name='FullName' className='form-control' placeholder="nhập vào họ tên" 
                                    value={inputData.FullName}
                            onChange={e => setInputData({ ...inputData, FullName: e.target.value })} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1" className="lb-edit-staff">Số điện thoại</label>
                                    <input type="text" class="form-control" name="Phone"  placeholder="nhập vào số điện thoại" value={inputData.Phone}
                                        onChange={e => setInputData({...inputData, Phone: e.target.value})}
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
                                    <label for="exampleFormControlTextarea1" className="lb-edit-staff">Chức vụ</label>
                                    <select class="form-control" name="Role"   onChange={e => setInputData({...inputData, Role: e.target.value})}>
                                        <option >Chọn loại</option>
                                        <option >Thu ngân</option>
                                        <option  >Shipper</option>

                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
export default EditStaff;