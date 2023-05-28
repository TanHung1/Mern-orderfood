import React from "react";
import { Link } from "react-router-dom";
import '../../My-Account/PreviousOders.scss'
function PreviousOders()  {
   
        return (
            <section className="my-account-wrapper">
                <div className="my-account-content">

                    <div className="nav-info-menu">
                        <div>
                            <div className="left-previousOders-content">
                                <div className="header-info">
                                    <h2>XIN CHÀO,<br /> HƯNG</h2>
                                    <p><a href="">Đăng xuất</a></p>
                                </div>
                                <ul >
                                <li> <Link to={"/my-account/previous-orders"} className="link">Lịch sử đặt hàng</Link></li>                
                                <li> <Link to={"/my-account/edit"} className="link">Chi tiết tài khoản</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="right-history">
                        <div className="previous-oders-right">
                            <h3>LỊCH SỬ DƠN HÀNG</h3>
                            <table className="pervious-oders-table">
                                <tr>
                                    <th className="previous-oders-header">Mã đơn hàng</th>
                                    <th className="previous-oders-header">Thông tin sản phẩm</th>
                                    <th className="previous-oders-header">Giá</th>
                                    <th className="previous-oders-header">Ngày đặt hàng</th>
                                    <th className="previous-oders-header">Trạng thái</th>
                                </tr>

                                <tr>
                                    <td className="previous-oders-content">001</td>
                                    <td className="previous-oders-content">Hamburger siêu to khổng lồ</td>
                                    <td className="previous-oders-content">200.000đ</td>
                                    <td className="previous-oders-content">12-04-2023</td>
                                    <td className="previous-oders-content">Đang Chờ</td>
                                </tr>
                                <tr>
                                    <td className="previous-oders-content">002</td>
                                    <td className="previous-oders-content">Pizza siêu to khổng lồ</td>
                                    <td className="previous-oders-content">300.000đ</td>
                                    <td className="previous-oders-content">13-04-2023</td>
                                    <td className="previous-oders-content">Đang giao</td>
                                </tr>
                                <tr>
                                    <td className="previous-oders-content">003</td>
                                    <td className="previous-oders-content">Gà rán siêu to khổng lồ</td>
                                    <td className="previous-oders-content">300.000đ</td>
                                    <td className="previous-oders-content">14-04-2023</td>
                                    <td className="previous-oders-content">Hoàn tất</td>
                                </tr>
                                <tr>
                                    <td className="previous-oders-content">003</td>
                                    <td className="previous-oders-content">Gà rán siêu to khổng lồ</td>
                                    <td className="previous-oders-content">300.000đ</td>
                                    <td className="previous-oders-content">14-04-2023</td>
                                    <td className="previous-oders-content">Hoàn tất</td>
                                </tr>
                                <tr>
                                    <td className="previous-oders-content">003</td>
                                    <td className="previous-oders-content">Gà rán siêu to khổng lồ</td>
                                    <td className="previous-oders-content">300.000đ</td>
                                    <td className="previous-oders-content">14-04-2023</td>
                                    <td className="previous-oders-content">Hoàn tất</td>
                                </tr>
                                <tr>
                                    <td className="previous-oders-content">003</td>
                                    <td className="previous-oders-content">Gà rán siêu to khổng lồ</td>
                                    <td className="previous-oders-content">300.000đ</td>
                                    <td className="previous-oders-content">14-04-2023</td>
                                    <td className="previous-oders-content">Hoàn tất</td>
                                </tr>
                                <tr>
                                    <td className="previous-oders-content">003</td>
                                    <td className="previous-oders-content">Gà rán siêu to khổng lồ</td>
                                    <td className="previous-oders-content">300.000đ</td>
                                    <td className="previous-oders-content">14-04-2023</td>
                                    <td className="previous-oders-content">Hoàn tất</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
        )
    }


export default PreviousOders;